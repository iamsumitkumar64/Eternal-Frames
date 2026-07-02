import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CreateEventModule } from "./create-event/create-event.module";
import { GetEventListingModule } from "./get-event-listing/get-event-listing.module";

@Module({
    imports: [
        CreateEventModule,
        GetEventListingModule,
        RouterModule.register([
            {
                path: 'event',
                children: [
                    { path: '', module: CreateEventModule },
                    { path: '', module: GetEventListingModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class EventModule { }
