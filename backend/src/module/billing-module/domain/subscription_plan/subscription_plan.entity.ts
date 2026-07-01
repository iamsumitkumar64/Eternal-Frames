import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubscriptionFeatureEntity } from '../subscription_feature/subscription_feature.entity';
import { SubscriptionUserEntity } from '../subscription_user/subscription_user.entity';

@Entity('subscription_plan')
export class SubscriptionPlanEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0.00 })
    price: number;

    @Column({ type: 'varchar', nullable: false, default: '$' })
    currency: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'int', nullable: false, default: 1, })
    premium_level: number;

    @OneToMany(() => SubscriptionFeatureEntity, (feature) => feature.plan, { cascade: true })
    features: SubscriptionFeatureEntity[];

    @OneToMany(() => SubscriptionUserEntity, (subscriptions_user) => subscriptions_user.plan, { cascade: true })
    subscriptions_user: SubscriptionUserEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
