import { hashPassword } from "../utils/hash";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
export class UserService {
    async createUser(email: string, password: string) {
        const hashedPassword = await hashPassword(password)
        const user = User.create({ email, password: hashedPassword })
        await user.save()
        return user;
    }


    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { id } })
            return user
        } catch (error) {
            console.error('Error in getUserById:', error)
            throw error
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { email } })
            return user;
        } catch (error) {
            console.error('Error in getUserByEmail:', error)
            return null
        }
    }

    async updateUser(updateUserDto: UpdateUserDto) {
        const user = await User.findOne({ where: { id: updateUserDto.id } })
        if (!user) {
            throw new Error("User not found")
        }
        if (updateUserDto.email) {
            user.email = updateUserDto.email
        }
        if (updateUserDto.username) {
            user.username = updateUserDto.username
        }
        if (updateUserDto.password) {
            user.password = await hashPassword(updateUserDto.password)
        }
        if (updateUserDto.name) {
            user.name = updateUserDto.name
        }
        if (updateUserDto.role) {
            user.role = updateUserDto.role
        }
        await user.save();
        return user;
    }

    async deleteUser(id: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw new Error("User not found")
        }
        await user.remove()
        return { message: "User deleted successfully" }
    }
}