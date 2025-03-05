
import { EventType } from "../core/enums/user-events.enum";
import { UserEvent } from "./entities/user-event.entity";
import { User } from "../user/entities/user.entity";
import { AppDataSource } from "../configuration/data-source";

export class UserEventService {
    private userEventRepository = AppDataSource.getRepository(UserEvent);
    private userRepository = AppDataSource.getRepository(User);

    async createUserEvent(eventType: EventType, userId: string): Promise<UserEvent> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        const userEvent = this.userEventRepository.create({
            eventType,
            user,
            userId
        });

        return await this.userEventRepository.save(userEvent);
    }
}
