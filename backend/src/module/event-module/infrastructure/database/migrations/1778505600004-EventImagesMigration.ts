import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class eventImagesMigration1778505600004 implements MigrationInterface {
    name = "eventImagesMigration1778505600004";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "event_images",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "event_uuid", type: "uuid", isNullable: true, },
                    { name: "tag_uuid", type: "uuid", },
                    { name: "image_url", type: "varchar", isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "event_images",
            new TableForeignKey({
                columnNames: ["event_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "event",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "event_images",
            new TableForeignKey({
                columnNames: ["tag_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "tag",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_images", true);
    }
}
