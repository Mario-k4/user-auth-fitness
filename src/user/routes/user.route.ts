import { Router } from "express";
import { UserController } from "../user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/users/create-user", userController.createUser.bind(userController));
userRouter.get("/users/:id", userController.getUserById.bind(userController));
userRouter.get("/users/", userController.getAllUsers.bind(userController));
userRouter.get("/users/email/:email", userController.getUserByEmail.bind(userController));
userRouter.put("/users/:id", userController.updateUser.bind(userController));
userRouter.delete("/users/:id", userController.deleteUser.bind(userController));

export default userRouter;
