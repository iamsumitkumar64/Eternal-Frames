import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription_plan/subscription_plan.entity';
import { UserEntity } from '../user/user.entity';

@Entity('subscription_user')
export class SubscriptionUserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: "uuid" })
    user_uuid: String;

    @ManyToOne(() => UserEntity, (user) => user.subscription, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @Column({ type: "uuid" })
    plan_uuid: String;

    @ManyToOne(() => SubscriptionPlanEntity, (plan) => plan.subscriptions_user, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plan_uuid' })
    plan: SubscriptionPlanEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
