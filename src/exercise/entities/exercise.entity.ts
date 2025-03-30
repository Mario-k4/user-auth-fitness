import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsBoolean, IsEnum, IsString } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { ExerciseCategory } from "../../core/enums/exercise-category.enum";
import { WorkoutExercise } from "../../workoutExercise/entities/workoutExercise.entity";

@Entity()
export class Exercise extends BaseEntity {
    @Column()
    @IsString()
    name!: string

    @Column({ default: false })
    @IsBoolean()
    isPredefined!: boolean;

    @Column({
        type: "enum",
        enum: ExerciseCategory
    })
    @IsEnum(ExerciseCategory)
    category: ExerciseCategory

    @ManyToOne(() => User, (user) => user.exercises, { nullable: true, onDelete: "CASCADE" })
    createdBy?: User;

    @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.exercise)
    workoutExercises: WorkoutExercise[];
}