import { Injectable } from "@nestjs/common";
import { EventRepository } from "src/module/event-module/infrastructure/repository/event.repository";

@Injectable()
export class GetEventByUuidService {
    constructor(
        private readonly repository: EventRepository,
    ) { }

    async handle(event_uuid: string) {
        const data = await this.repository.findByUuid(event_uuid);

        return { data };
    }
}
