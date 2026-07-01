import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoleEnum } from "./user.enum";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ type: "varchar", nullable: false, })
    name: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.CUSTOMER })
    role: UserRoleEnum;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}