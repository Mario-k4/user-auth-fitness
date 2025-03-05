import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true, nullable: true })
    @IsString()
    @Length(3, 20)
    username?: string;

    @Column({ unique: true })
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    name: string;
}