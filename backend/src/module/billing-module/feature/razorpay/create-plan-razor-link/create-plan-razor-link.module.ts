import { Module } from "@nestjs/common";
import { CreatePlanRazorLinkController } from "./create-plan-razor-link.controller";
import { CreatePlanRazorLinkService } from "./create-plan-razor-link.handler";

@Module({
    imports: [],
    controllers: [CreatePlanRazorLinkController],
    providers: [CreatePlanRazorLinkService],
    exports: [],
})
export class CreatePlanRazorLinkModule { }
