import { Command, CommandRunner } from 'nest-commander';
import { UserOutboxEntryPublisherCronService } from '../../../cron/outbox.entry.publisher/outbox.entry.publisher';

@Command({
  name: 'dispatch-user-outbox',
  description: 'Dispatch user outbox entries',
})
export class UserOutboxEntryPublisherCommand extends CommandRunner {
  constructor(
    private readonly userOutboxEntryPublisherCronService: UserOutboxEntryPublisherCronService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.userOutboxEntryPublisherCronService.handleCron();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    process.exit(0);
  }
}
