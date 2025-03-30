import { IsUUID, IsNumber, IsOptional } from "class-validator";

export class CreateWorkoutExerciseDto {
    @IsUUID()
    workoutId: string;

    @IsUUID()
    exerciseId: string;

    @IsOptional()
    @IsNumber()
    sets?: number;

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
