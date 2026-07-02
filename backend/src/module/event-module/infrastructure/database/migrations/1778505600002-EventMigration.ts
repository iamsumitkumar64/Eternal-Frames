import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class eventMigration1778505600002 implements MigrationInterface {
    name = "eventMigration1778505600002";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "event",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "user_uuid", type: "uuid" },
                    { name: "title", type: "varchar", isNullable: false, },
                    { name: "description", type: "text", isNullable: true, },
                    { name: "image_url", type: "varchar", isNullable: true, },
                    { name: "location", type: "varchar", isNullable: true, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "event",
            new TableForeignKey({
                columnNames: ["user_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event", true);
    }
}
