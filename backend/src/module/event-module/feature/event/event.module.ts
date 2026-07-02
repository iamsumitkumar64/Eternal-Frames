import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CreateEventModule } from "./create-event/create-event.module";
import { GetEventListingModule } from "./get-event-listing/get-event-listing.module";
import { DeleteEventModule } from "./delete-event/delete-event.module";

@Module({
    imports: [
        CreateEventModule,
        GetEventListingModule,
        DeleteEventModule,
        RouterModule.register([
            {
                path: 'event',
                children: [
                    { path: '', module: CreateEventModule },
                    { path: '', module: GetEventListingModule },
                    { path: '', module: DeleteEventModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class EventModule { }
