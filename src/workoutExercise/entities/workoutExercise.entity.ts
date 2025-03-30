import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsNumber } from "class-validator";
import { Workout } from "../../workout/entities/workout.entity";
import { Exercise } from "../../exercise/entities/exercise.entity";

@Entity()
export class WorkoutExercise extends BaseEntity {
    @Column()
    @IsNumber()
    sets: number;

    @Column()
    @IsNumber()
    reps: number;

    @Column({ nullable: true })
    @IsNumber()
    weight?: number;

    @Column({ nullable: true })
    @IsNumber()
    duration?: number

    @ManyToOne(() => Workout, (workout) => workout.workoutExercises, { nullable: false, onDelete: "CASCADE", eager: true })
    @JoinColumn({ name: "workoutId" })
    workout: Workout;

    @ManyToOne(() => Exercise, { nullable: false, onDelete: "CASCADE" })
    exercise: Exercise;
}