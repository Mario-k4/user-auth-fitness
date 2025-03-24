import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsString, Length } from "class-validator";
import { UserRoleEnum } from "../../core/enums/user-role.enum"

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true, nullable: true })
    @IsString()
    @Length(3, 20)
    username?: string;

    @Column({ unique: true })
    @IsString()
    @IsEmail()
    email!: string;

    @Column()
    @IsString()
    password!: string;

    @Column({
        type: "enum",
        enum: UserRoleEnum,
        default: UserRoleEnum.TRAINEE
    })
    @IsEnum(UserRoleEnum)
    role!: UserRoleEnum

    @Column({})
    @IsString()
    name!: string;

    @Column({ nullable: true })
    @IsString()
    token!: string;

    @Column({ nullable: true })
    @IsString()
    refreshToken!: string;

    @Column({ nullable: true, type: "timestamptz" })
    @IsDate()
    refreshTokenExpiresAt!: Date | null;

    @Column({ nullable: true })
    @IsString()
    otp!: string | null;

    @Column({ nullable: true, type: "timestamptz" })
    @IsDate()
    otpExpiresAt!: Date | null;

    @Column({ unique: true, nullable: true })
    @IsString()
    secretKey!: string;

    @Column({ default: false })
    @IsBoolean()
    twoFactorEnabled!: boolean;

    @Column({ nullable: true })
    @IsString()
    twoFactorMethod!: string;

}