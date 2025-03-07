import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { UserRoleEnum } from "../../core/enums/user-role.enum";

export class UpdateUserDto {
    @IsUUID()
    id?: string

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsEnum(UserRoleEnum)
    role?: UserRoleEnum

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    name?: string;
}