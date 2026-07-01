import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SubscriptionUserMigration1778505600003 implements MigrationInterface {
    name = "subscriptionUserMigration1778505600003";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subscription_user",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "user_uuid", type: "uuid", },
                    { name: "plan_uuid", type: "uuid", },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "subscription_user",
            new TableForeignKey({
                columnNames: ["user_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "subscription_user",
            new TableForeignKey({
                columnNames: ["plan_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "subscription_plan",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("subscription_user", "plan_uuid");
        await queryRunner.dropTable("subscription_user");
    }
}
