import { Injectable, Logger } from '@nestjs/common';
import { MongoDBService } from './core/database/mongodb.service';
import { KafkaService } from './core/event-bus/kafka.service';
import { CreateAccountDto } from './domain/account/entities/account.dto';
import { CREATE_ACCOUNT_KAFKA_TOPIC } from './core/event-bus/kafka.configuration';

@Injectable()
export class AppService {
  constructor(
    private readonly db: MongoDBService,
    private readonly eventBusService: KafkaService,
    private readonly logger: Logger,
  ) {}

  async getHello() {
    return 'Hello World!';
  }

  async publishCreateAccountEvent(dto: CreateAccountDto) {
    this.logger.log('Publishing create account event...');

    const payload = JSON.stringify(dto);
    await this.eventBusService.emit(payload, CREATE_ACCOUNT_KAFKA_TOPIC);

    this.logger.log(
      `Message successfully published to the ${CREATE_ACCOUNT_KAFKA_TOPIC} topic`,
    );

    return;
  }
}
