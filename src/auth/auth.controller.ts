import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { comparePassword } from "../utils/hash";
import { generateRefreshToken, generateToken } from "../utils/jwt";
import { ONE_WEEK_IN_MS } from "../utils/constants";
import { AuthUserDto } from "../user/dto/auth-user.dto";

const userService = new UserService()

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
        await existingUser.save();

        res.send({ user: authUserDto, accessToken })
    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};