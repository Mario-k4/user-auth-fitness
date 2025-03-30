import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { enableAppAuth, enableEmailAuth, verifyAppAuth, verifyEmailAuth } from "../utils/twoFactorAuth.utilts";
import { UserEventService } from "../user-event/user-event.service";
import { EventType } from "../core/enums/user-events.enum";

const userService = new UserService();
const userEventService = new UserEventService();

export const enable2FA = async (req: Request, res: Response) => {
    const { userId, method } = req.body;

    if (!method || !["app", 'email'].includes(method)) {
        res.status(400).send({ message: "Invalid 2FA method" });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        let response;
        if (method === 'app') {
            response = await enableAppAuth(user);
        } else if (method === 'email') {
            response = await enableEmailAuth(user);
        }
        res.send(response);
        userEventService.createEvent(
            user,
            EventType.TWO_FACTOR_ENABLED,
            `Two-factor authentication enabled using ${method}`
        );

    } catch (error) {
        console.error("Enable 2FA error", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

export const verify2FA = async (req: Request, res: Response) => {
    const { userId, method, otp } = req.body;

    if (!method || !["app", 'email'].includes(method)) {
        res.status(400).send({ message: "Invalid 2FA method" });
    }

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        let response;
        if (method === 'app') {
            response = await verifyAppAuth(user, otp);
        } else if (method === 'email') {
            response = await verifyEmailAuth(user, otp);
        }
        res.send(response);
    } catch (error) {
        console.error("Verify 2FA error", error);
        res.status(500).send({ message: "Internal server error" });
    }
}
