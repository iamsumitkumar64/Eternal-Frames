import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class SubscriptionFeatureMigration1778505600002 implements MigrationInterface {
    name = "subscriptionFeatureMigration1778505600002";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subscription_feature",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "feature_name", type: "varchar", isNullable: false, },
                    { name: "is_included", type: "boolean", default: true, },
                    { name: "plan_uuid", type: "uuid", },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "subscription_feature",
            new TableForeignKey({
                columnNames: ["plan_uuid"],
                referencedColumnNames: ["uuid"],
                referencedTableName: "subscription_plan",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("subscription_feature", "plan_uuid");
        await queryRunner.dropTable("subscription_feature");
    }
}
