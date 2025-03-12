import { EventType } from "../core/enums/user-events.enum";
import { User } from "../user/entities/user.entity";
import { UserEvent } from "./entities/user-event.entity";

export class UserEventService {
    async createEvent(user: User, eventType: EventType, description?: string): Promise<UserEvent> {
        const userEvent = new UserEvent()
        userEvent.user = user
        userEvent.eventType = eventType
        userEvent.description = description
        return userEvent.save()
    }
}