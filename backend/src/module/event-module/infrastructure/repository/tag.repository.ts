import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { TagEntity } from "../../domain/tag/tag.entity";

@Injectable()
export class TagRepository extends Repository<TagEntity> {
    constructor(
        @InjectDataSource(process.env.DB_POSTGRES_EVENT_SCHEMA || 'tag_schema')
        private readonly dataSource: DataSource,
    ) {
        super(TagEntity, dataSource.createEntityManager());
    }

    async createTag(body: Partial<TagEntity>) {
        const tag = this.create(body);
        return await this.save(tag);
    }

    async findByUuid(uuid: string) {
        const tag = await this.findOne({
            where: {
                uuid: uuid
            }
        });
        return tag;
    }

    async findByTagName(tag_name: string) {
        const tag = await this.findOne({
            where: {
                tag_name: tag_name
            }
        });
        return tag;
    }
}
