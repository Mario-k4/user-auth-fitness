import { IsString, MinLength } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
    @MinLength(1, { message: "Name cannot be empty" })
    title: string;
}