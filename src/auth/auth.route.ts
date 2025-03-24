import { Router } from "express";
import { forgotPasswordHandler, loginHandler, logoutHandler, refreshTokenHandler, registerHandler, resetPasswordHandler } from "./auth.controller";

const authRouter = Router()

authRouter.post("/auth/register", registerHandler);
authRouter.post("/auth/login", loginHandler);
authRouter.post("/auth/logout", logoutHandler);
authRouter.post("/auth/refresh-token", refreshTokenHandler);
authRouter.post("/auth/forgot-password", forgotPasswordHandler);
authRouter.post("/auth/reset-password", resetPasswordHandler);


export default authRouter