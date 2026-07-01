import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubscriptionPlanEntity } from '../subscription_plan/subscription_plan.entity';

@Entity('subscription_feature')
export class SubscriptionFeatureEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', nullable: false })
    feature_name: string;

    @Column({ type: 'boolean', default: true })
    is_included: boolean;

    @Column({ type: "uuid" })
    plan_uuid: String;

    @ManyToOne(() => SubscriptionPlanEntity, (plan) => plan.features, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'plan_uuid' })
    plan: SubscriptionPlanEntity;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
