import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsDate, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
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

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    name!: string;

    @Column({ nullable: true })
    @IsString()
    token!: string;

    @Column({ nullable: true })
    @IsString()
    refreshToken!: string;

    @Column({ nullable: true, type: "timestamptz" })
    @IsDate()
    refreshTokenExpiresAt!: Date | null
}