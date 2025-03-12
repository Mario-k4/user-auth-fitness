import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { comparePassword } from "../utils/hash";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/jwt";
import { ONE_WEEK_IN_MS } from "../utils/constants";
import { AuthUserDto } from "../user/dto/auth-user.dto";
import { UserEventService } from "../user-event/user-event.service";
import { EventType } from "../core/enums/user-events.enum";
import { JwtPayload } from "jsonwebtoken";
import { EmailService } from "../email/email-notification.service";

const userEventService = new UserEventService()
const userService = new UserService()
const emailService = new EmailService()

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists." });
            return
        }

        const user = await userService.createUser(email, password);
        res.json({ user });
        return
    } catch (error) {
        console.error("Register error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const existingUser = await userService.getUserByEmail(email);
        if (!existingUser) {
            res.status(404).json({ message: "User not found." });
            return
        }

        const isValidPassword = await comparePassword(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return
        }

        const accessToken = generateToken(existingUser.id, existingUser.role);
        const refreshToken = generateRefreshToken(existingUser.id, existingUser.role);

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: ONE_WEEK_IN_MS,
        });

        const authUserDto = new AuthUserDto(existingUser)
        const refreshTokenExpiration = new Date(Date.now() + ONE_WEEK_IN_MS);
        existingUser.refreshTokenExpiresAt = refreshTokenExpiration;
        await userEventService.createEvent(existingUser, EventType.LOGIN, `User logged in`);
        await existingUser.save();

        res.send({ user: authUserDto, accessToken })
    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutHandler = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).send({ message: "Refresh token not found." });
    }

    try {
        const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET) as JwtPayload;
        const user = await userService.getUserById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(401).send({ message: "Invalid refresh token." });
        }

        user.refreshToken = null;
        user.refreshTokenExpiresAt = null;
        await user.save();

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).send({ message: "User logged out successfully." });
    } catch (error) {
        console.error("Logout error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        res.status(401).send({ message: "Refresh token not found." });
    }
    try {
        const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET) as JwtPayload;

        const user = await userService.getUserById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(401).send({ message: "Invalid refresh token." });
        }

        const newAccessToken = generateToken(decoded.id, decoded.role);
        const newRefreshToken = generateRefreshToken(decoded.id, decoded.role);
        await user.save()

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: ONE_WEEK_IN_MS,
        });

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Refresh token error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPasswordHandler = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return
        }

        const resetToken = generateToken(user.id, user.role);
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(resetToken)}`;
        await emailService.sendPasswordResetEmail(user.email, resetLink)

        res.json({ message: "Password reset link sent." });
    } catch (error) {
        console.error("Forgot password error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}