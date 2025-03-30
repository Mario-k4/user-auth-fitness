import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWorkoutExerciseDto {
    @IsOptional()
    @IsNumber()
    sets?: number;

    @IsOptional()
    @IsString()
    exerciseId?: string;

    @IsOptional()
    @IsNumber()
    reps?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    duration?: number;
}
