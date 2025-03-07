import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../core/entities/base.entity.ts";
import { IsEnum } from "class-validator";
import { EventType } from "../../core/enums/user-events.enum";

@Entity()
export class UserEvent extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user!: User;

  @Column({ type: "enum", enum: EventType })
  @IsEnum(EventType)
  eventType!: EventType;

  @Column({ nullable: true })
  description!: string;
}
