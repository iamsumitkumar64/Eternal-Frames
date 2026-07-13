import { Command, CommandRunner } from 'nest-commander';
import { UserOutboxEntryPublisherCronService } from '../module/user-module/infrastructure/cron/outbox.entry.publisher/outbox.entry.publisher';
import { BillingOutboxEntryPublisherCronService } from '../module/billing-module/infrastructure/cron/outbox.entry.publisher/outbox.entry.publisher';
import { EventOutboxEntryPublisherCronService } from '../module/event-module/infrastructure/cron/outbox.entry.publisher/outbox.entry.publisher';

@Command({
  name: 'run-cron',
  description: 'Run the outbox publisher cron jobs',
})
export class CronCommand extends CommandRunner {
  constructor(
    private readonly userOutbox: UserOutboxEntryPublisherCronService,
    private readonly billingOutbox: BillingOutboxEntryPublisherCronService,
    private readonly eventOutbox: EventOutboxEntryPublisherCronService,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('Running Outbox Publisher Cron Jobs...');
    await Promise.all([
      this.userOutbox.handleCron(),
      this.billingOutbox.handleCron(),
      this.eventOutbox.handleCron(),
    ]);
    console.log('Cron Jobs finished.');
    process.exit(0);
  }
}
