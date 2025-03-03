import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsEmail, IsString, Length } from "class-validator";

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    @IsString()
    @Length(3, 20)
    username: string;

    @Column({ unique: true })
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsString()
    name: string;
}