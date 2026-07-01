import { BadRequestException, Injectable } from "@nestjs/common";
import Razorpay from 'razorpay';
import { createPlanRazorLinkDto } from "./create-plan-razor-link.dto";
import { SubscriptionUserRepository } from "src/module/billing-module/infrastructure/repository/subscription-user.repository";
import type { Request } from "express";

@Injectable()
export class CreatePlanRazorLinkService {
    constructor(
        private readonly repository: SubscriptionUserRepository,
    ) { }

    async handle(req: Request, body: createPlanRazorLinkDto) {
        const isActivePlanExists = await this.repository.findByUserUuid(req.user.uuid);
        if (isActivePlanExists) {
            throw new BadRequestException("You have Active Plan right now");
        }

        const shortUuid = body.plan_uuid.substring(0, 30);

        const razor = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const razorOrder = await razor.orders.create({
            amount: Math.round(body.total_price) * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${shortUuid}`,
        });

        return {
            data: razorOrder
        };
    }
}