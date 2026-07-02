import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('subscription_user')
export class SubscriptionUserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @ManyToOne(() => UserEntity, (user) => user.subscription, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @Column({ type: 'uuid' })
    plan_uuid: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
