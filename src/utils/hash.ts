import * as argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
    return argon2.hash(password)
}

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        return argon2.verify(hashedPassword, plainPassword)
    } catch (error) {
        console.error('Password verification failed:', error)
        return false
    }
}