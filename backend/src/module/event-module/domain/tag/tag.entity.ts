import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventImagesEntity } from '../event_images/event_images.entity';

@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    tag_name: string;

    @OneToMany(() => EventImagesEntity, (image) => image.tag, { cascade: true })
    event_images: EventImagesEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}
