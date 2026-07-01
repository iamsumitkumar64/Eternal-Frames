import { Module } from "@nestjs/common";
import { CreatePlanRazorLinkModule } from "./create-plan-razor-link/create-plan-razor-link.module";

@Module({
    imports: [CreatePlanRazorLinkModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class RazorModule { }
