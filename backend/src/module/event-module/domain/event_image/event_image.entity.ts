import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { EventEntity } from '../event/event.entity';

@Entity('event_image')
export class EventImageEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'uuid', nullable: true })
    event_uuid: string;

    @ManyToOne(() => EventEntity, (event) => event.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_uuid' })
    event: EventEntity;

    @Column({ type: 'uuid' })
    tag_uuid: string;

    @ManyToOne(() => TagEntity, (tag) => tag.event_images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tag_uuid' })
    tag: TagEntity;

    @Column({ type: 'varchar', nullable: false })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
