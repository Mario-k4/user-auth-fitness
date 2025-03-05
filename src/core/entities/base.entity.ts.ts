import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity as TypeORMBaseEntity,
} from "typeorm";
import { IsUUID, IsDate } from "class-validator";

export abstract class BaseEntity extends TypeORMBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    updatedAt: Date;
}
