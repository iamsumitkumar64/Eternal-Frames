import { billingDataSource, options } from '../data-source';
import { UserEntity } from '../../../domain/user/user.entity';
import { UserRoleEnum } from 'src/module/billing-module/domain/user/user.enum';

// hardcoded users for all microservices
const users = [
    {
        uuid: 'c0a80101-7b1d-4a9f-8c1a-123456789001',
        email: 'user1@gmail.com',
        name: 'user 1',
        role: UserRoleEnum.STUDIO,
        created_at: new Date('2025-01-01T00:00:00.000Z'),
    },
    {
        uuid: 'c0a80102-7b1d-4a9f-8c1a-123456789002',
        email: 'user2@gmail.com',
        name: 'user 2',
        created_at: new Date('2025-01-02T00:00:00.000Z'),
        role: UserRoleEnum.USER,
    },
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

        // use same users across all services
        for (const user of users) {
            const created_user = await queryRunner.manager.save(UserEntity, {
                uuid: user.uuid,
                email: user.email,// faker.internet.email(),
                name: user.name,// faker.person.fullName(),
                role: user.role,
            });

            console.log(created_user);
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