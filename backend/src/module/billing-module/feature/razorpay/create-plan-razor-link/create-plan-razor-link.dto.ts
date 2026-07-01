import { IsNumber, IsUUID, Min } from 'class-validator';

export class createPlanRazorLinkDto {
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1)
    total_price: number;

    @IsUUID()
    plan_uuid: string;
}