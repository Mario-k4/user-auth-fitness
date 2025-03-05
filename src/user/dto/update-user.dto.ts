import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

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
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsString()
    name?: string;
}