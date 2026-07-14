import { CommandFactory } from 'nest-commander';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { CommandModule } from './command.module';
import { createSchemas } from 'src/common/infrastructure/db/bootstrap/db_schema.create';

async function bootstrap() {
    try {
        initializeTransactionalContext();
        await createSchemas();

        await CommandFactory.run(CommandModule, ['log', 'error', 'warn']);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

bootstrap();