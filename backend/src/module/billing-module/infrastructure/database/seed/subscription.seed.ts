import { billingDataSource, options } from '../data-source';
import { SubscriptionPlanEntity } from 'src/module/billing-module/domain/subscription_plan/subscription_plan.entity';
import { SubscriptionFeatureEntity } from 'src/module/billing-module/domain/subscription_feature/subscription_feature.entity';

// hardcoded users for all microservices
const subscription_plan = [
    {
        uuid: 'c1a80101-7b1d-4a9f-8c1a-223456789001',
        title: 'The Foundation',
        description: 'Essential',
        price: 32.12,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: 'c1a80101-7b1d-4a9f-8c1a-223456789002',
        title: 'The Absolute Standard',
        description: 'Eternal',
        price: 129.52,
        premium_level: 5,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
];

const subscription1_features = [
    {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        feature_name: "Up to 50 active wedding galleries",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: "123e4567-e89b-12d3-a456-426614174001",
        feature_name: "1TB Secure Cloud Storage",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: "123e4567-e89b-12d3-a456-426614174002",
        feature_name: "Standard 4K Image Delivery",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    }, {
        uuid: "123e4567-e89b-12d3-a456-426614174003",
        feature_name: "White-label branding not included",
        is_included: false,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    }
];

const subscription2_features = [
    {
        uuid: "124e4567-e89b-12d3-a456-426614174000",
        feature_name: "Unlimited active galleries",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: "124e4567-e89b-12d3-a456-426614174001",
        feature_name: "Uncapped Lossless Storage",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: "124e4567-e89b-12d3-a456-426614174002",
        feature_name: "Full White-Label Client Experience",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    }, {
        uuid: "124e4567-e89b-12d3-a456-426614174003",
        feature_name: "Priority Concierge Support",
        is_included: true,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    }
];


async function create() {
    billingDataSource.setOptions({
        ...options,
    });

    await billingDataSource.initialize();

    const queryRunner = billingDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        // use same plan across all services
        for (const plan of subscription_plan) {
            const created_plan = await queryRunner.manager.save(SubscriptionPlanEntity, plan);

            console.log(created_plan);
        }

        for (const feature of subscription1_features) {
            const created_feature = await queryRunner.manager.save(SubscriptionFeatureEntity, {
                ...feature,
                plan_uuid: subscription_plan[0].uuid,
            });

            console.log(created_feature);
        }

        for (const feature of subscription2_features) {
            const created_feature = await queryRunner.manager.save(SubscriptionFeatureEntity, {
                ...feature,
                plan_uuid: subscription_plan[1].uuid,
            });

            console.log(created_feature);
        }

        await queryRunner.commitTransaction();
        console.info('✅ Seeded successfully');
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('❌ Something went wrong:', error);
    } finally {
        await queryRunner.release();
    }
}

void create();