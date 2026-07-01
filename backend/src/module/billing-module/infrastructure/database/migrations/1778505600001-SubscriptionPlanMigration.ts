import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SubscriptionPlanMigration1778505600001 implements MigrationInterface {
    name = "subscriptionPlanMigration1778505600001";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subscription_plan",
                columns: [
                    { name: "uuid", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()", },
                    { name: "title", type: "varchar", isNullable: false, isUnique: true, },
                    { name: "description", type: "text", isNullable: true, },
                    { name: "price", type: "decimal", precision: 10, scale: 2, isNullable: false, default: 0.00, },
                    { name: "currency", type: "varchar", isNullable: false, default: "'USD'", },
                    { name: "is_active", type: "boolean", isNullable: false, default: true, },
                    { name: "premium_level", type: "int", isNullable: false, default: 1, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("subscription_plan");
    }
}