import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventImageEntity } from '../event_image/event_image.entity';
import { UserEntity } from '../user/user.entity';

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid' })
    user_uuid: string;

    @ManyToOne(() => UserEntity, (user) => user.events, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: UserEntity;

    @Column({ type: 'varchar', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    image_url: string;

    @Column({ type: 'varchar', nullable: true })
    location: string;

    @OneToMany(() => EventImageEntity, (image) => image.event, { cascade: true })
    images: EventImageEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
