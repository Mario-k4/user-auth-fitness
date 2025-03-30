import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateWorkoutDto {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: "Name cannot be empty" })
    name?: string
}