import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventImageEntity } from '../event_image/event_image.entity';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    tag_name: string;

    @OneToMany(() => EventImageEntity, (image) => image.tag, { cascade: true })
    event_images: EventImageEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
