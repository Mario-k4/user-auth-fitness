import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ExerciseCategory } from "../../core/enums/exercise-category.enum";

export class CreateExerciseDto {
    @IsString()
    @MinLength(1, { message: "Name cannot be empty" })
    name: string

    @IsEnum(ExerciseCategory, { message: "Invalid Category" })
    category: ExerciseCategory;

    @IsOptional()
    @IsBoolean()
    isPredefined?: boolean = false
}