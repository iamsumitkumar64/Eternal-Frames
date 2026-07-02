import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class tagMigration1778505600003 implements MigrationInterface {
    name = "tagMigration1778505600003";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tag",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "tag_name", type: "varchar", isUnique: true, isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tag", true);
    }
}
