import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { UpdateUserModule } from "./update-user/update-user.module";

@Module({
    imports: [
        UpdateUserModule,
        RouterModule.register([
            {
                path: 'fuck',
                children: [
                    { path: '', module: UpdateUserModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})

export class UserModule { }