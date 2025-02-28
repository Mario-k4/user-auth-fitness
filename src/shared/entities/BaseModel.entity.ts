import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsUUID, IsDate } from "class-validator";

export abstract class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;
}
