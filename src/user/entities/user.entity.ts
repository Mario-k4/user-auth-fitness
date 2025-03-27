import { Column, Entity, OneToMany } from "typeorm";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { UserRoleEnum } from "../../core/enums/user-role.enum";
import { Workout } from "../../workout/entities/workout.entity";
import { Exercise } from "../../exercise/entities/exercise.entity";
import { BaseEntity } from "../../core/entities/base.entity.ts";

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true, nullable: true })
    @IsString()
    @Length(3, 20)
    username?: string;

    @Column({ unique: true })
    @IsString()
    @IsEmail()
    email!: string;

    @Column()
    @IsString()
    password!: string;

    @Column({
        type: "enum",
        enum: UserRoleEnum,
        default: UserRoleEnum.TRAINEE
    })
    @IsEnum(UserRoleEnum)
    role!: UserRoleEnum;

    @Column()
    @IsString()
    name!: string;

    @Column({ nullable: true })
    @IsString()
    token!: string;

    @Column({ nullable: true })
    @IsString()
    refreshToken!: string;

    @Column({ nullable: true, type: "timestamptz" })
    @IsDate()
    refreshTokenExpiresAt!: Date | null;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    otp!: string | null;

    @Column({ nullable: true, type: "timestamptz" })
    @IsDate()
    otpExpiresAt!: Date | null;

    @Column({ unique: true, nullable: true })
    @IsString()
    @IsOptional()
    secretKey!: string | null;

    @Column({ default: false })
    @IsBoolean()
    twoFactorEnabled!: boolean;

    @Column({ nullable: true })
    @IsString()
    twoFactorMethod!: string;

    @OneToMany(() => Exercise, (exercise) => exercise.createdBy)
    exercises!: Exercise[];

    @OneToMany(() => Workout, (workout) => workout.user)
    workouts!: Workout[];
}
