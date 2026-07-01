
import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { CreatePlanRazorLinkService } from "./create-plan-razor-link.handler";
import { createPlanRazorLinkDto } from "./create-plan-razor-link.dto";

@Controller()
export class CreatePlanRazorLinkController {
    constructor(private readonly createPlanRazorLinkService: CreatePlanRazorLinkService) { }

    @Post("/razor/plan/link")
    async CreatePlanRazorLink(@Req() req: Request, @Body() body: createPlanRazorLinkDto) {
        const { data } = await this.createPlanRazorLinkService.handle(req,body);

        return {
            data: data,
            message: "Razor Plan link Created successfully"
        };
    }
}