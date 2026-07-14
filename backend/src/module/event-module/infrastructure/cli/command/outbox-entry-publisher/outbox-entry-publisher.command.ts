import { Command, CommandRunner } from 'nest-commander';
import { EventOutboxEntryPublisherCronService } from '../../../cron/outbox.entry.publisher/outbox.entry.publisher';

@Command({
  name: 'dispatch-event-outbox',
  description: 'Dispatch event outbox entries',
})
export class EventOutboxEntryPublisherCommand extends CommandRunner {
  constructor(
    private readonly eventOutboxEntryPublisherCronService: EventOutboxEntryPublisherCronService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.eventOutboxEntryPublisherCronService.handleCron();
    process.exit(0);
  }
}
