import { BadRequestException, Injectable } from "@nestjs/common";
import Razorpay from 'razorpay';
import { createPlanRazorLinkDto } from "./create-plan-razor-link.dto";

@Injectable()
export class CreatePlanRazorLinkService {
    constructor(
    ) { }

    async handle(body: createPlanRazorLinkDto) {
        const shortUuid = body.plan_uuid.substring(0, 30);

        const razor = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const razorOrder = await razor.orders.create({
            amount: Math.round(body.total_price),
            currency: "USD",
            receipt: `receipt_${shortUuid}`,
        });

        return {
            data: razorOrder
        };
    }
}