import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoleEnum } from "./user.enum";
import { SubscriptionUserEntity } from "../subscription_user/subscription_user.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ type: "varchar", nullable: false, })
    name: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.USER })
    role: UserRoleEnum;

    @OneToMany(() => SubscriptionUserEntity, (subscriptions_user) => subscriptions_user.user, { cascade: true })
    subscription: SubscriptionUserEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}