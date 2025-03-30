export class AuthUserDto {
    id: string
    email: string
    token: string
    role: string
    createdAt: Date
    updatedAt: Date

    constructor(user: AuthUserDto) {
        this.id = user.id
        this.email = user.email
        this.token = user.token
        this.role = user.role
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }
}