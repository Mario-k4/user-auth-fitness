import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseModel } from "../../shared/entities/BaseModel.entity";
import { IsEnum } from "class-validator";
import { EventType } from "../../shared/utils/enums/UserEvent.enum";

@Entity()
export class UserEvent extends BaseModel {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column({ type: "enum", enum: EventType })
  @IsEnum(EventType)
  eventType: EventType;

  @Column({ nullable: true })
  description: string;
}
