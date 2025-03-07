import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

const userService = new UserService()

export class UserController {

    async createUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await userService.createUser(email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await userService.getUserById(id);

            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params
            const user = await userService.getUserByEmail(email);

            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers()
            if (users.length === 0) {
                res.status(404).json({ message: 'No students found' });
                return;
            }

            res.status(200).json(users);
        } catch (error) {
            throw new Error('An error occurred while fetching the list of students');
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params
            const updateUserDto: UpdateUserDto = req.body
            updateUserDto.id = id;

            const updatedUser = await userService.updateUser(updateUserDto)

            return res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser
            })
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            await userService.deleteUser(req.params.id);
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
}
