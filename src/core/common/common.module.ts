import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from '../configuration/configuration';
import { MongoDBService } from '../database/mongodb.service';
import { KafkaService } from '../event-bus/kafka.service';
import { setupKafkaConfig } from '../event-bus/kafka.configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { Kafka } from 'kafkajs';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    Logger,
    MongoDBService,
    KafkaService,
    {
      provide: 'KAFKA_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Kafka(setupKafkaConfig(configService));
      },
      inject: [ConfigService],
    },
  ],
  exports: [ConfigModule, Logger, MongoDBService, KafkaService],
})
export class CommonModule {}
