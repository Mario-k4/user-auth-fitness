import { Router } from "express";
import { enable2FA, verify2FA } from "./twoFactorAuth.controller";

const twoFactorAuthRouter = Router();

twoFactorAuthRouter.post("/enable", enable2FA);
twoFactorAuthRouter.post("/verify", verify2FA);

export default twoFactorAuthRouter;