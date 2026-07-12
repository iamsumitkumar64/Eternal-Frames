import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CreateEventModule } from "./create-event/create-event.module";
import { GetEventListingModule } from "./get-event-listing/get-event-listing.module";
import { DeleteEventModule } from "./delete-event/delete-event.module";
import { CreateEventImageModule } from "./create-event-image/create-event-image.module";
import { GetEventByUuidModule } from "./get-event-by-uuid/get-event-listing.module";
import { DeleteEventImageModule } from "./delete-event-image/delete-event.module";

@Module({
    imports: [
        CreateEventModule,
        GetEventListingModule,
        DeleteEventModule,
        CreateEventImageModule,
        GetEventByUuidModule,
        DeleteEventImageModule,
        RouterModule.register([
            {
                path: 'event',
                children: [
                    { path: '', module: CreateEventModule },
                    { path: '', module: GetEventListingModule },
                    { path: '', module: DeleteEventModule },
                    { path: '', module: GetEventByUuidModule },
                    { path: 'image', module: CreateEventImageModule },
                    { path: 'image', module: DeleteEventImageModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class EventModule { }
