import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsString } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { WorkoutExercise } from "../../workoutExercise/entities/workoutExercise.entity";

@Entity()
export class Workout extends BaseEntity {
    @Column()
    @IsString()
    title!: string;

    @ManyToOne(() => User, (user) => user.workouts, { nullable: false, onDelete: "CASCADE" })
    user!: User

    @OneToMany(() => WorkoutExercise, (we) => we.workout, { cascade: true })
    workoutExercises: WorkoutExercise[];

}