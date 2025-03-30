import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ExerciseCategory } from "../../core/enums/exercise-category.enum";

export class UpdateExerciseDto {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: "Name cannot be empty" })
    name?: string

    @IsOptional()
    @IsEnum(ExerciseCategory, { message: "Invalid category" })
    category?: ExerciseCategory;

    @IsOptional()
    @IsBoolean()
    isPredifined?: boolean
}