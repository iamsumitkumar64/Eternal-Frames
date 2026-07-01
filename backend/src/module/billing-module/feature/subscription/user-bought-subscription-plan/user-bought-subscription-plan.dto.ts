import { IsUUID } from 'class-validator';

export class UserBoughtSubscriptionPlanDto {
    @IsUUID()
    plan_uuid: string;
}