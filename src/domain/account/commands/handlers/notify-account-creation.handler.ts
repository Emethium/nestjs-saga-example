import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from 'src/core/event-bus/kafka.service';
import { NotifyAccountCreationCommand } from '../notify-account-creation.command';
import { ACCOUNT_CREATED_KAFKA_TOPIC } from 'src/core/event-bus/kafka.configuration';

@Injectable()
@CommandHandler(NotifyAccountCreationCommand)
export class NotifyAccountCreatedHandler
  implements ICommandHandler<NotifyAccountCreationCommand>
{
  constructor(
    private readonly eventBusService: KafkaService,
    private readonly logger: Logger,
  ) {}

  public async execute(command: NotifyAccountCreationCommand) {
    this.logger.log('Starting the notify account creation handler...');

    return this.eventBusService.emit(
      JSON.stringify(command),
      ACCOUNT_CREATED_KAFKA_TOPIC,
    );
  }
}
