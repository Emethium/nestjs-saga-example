import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaService } from './core/event-bus/kafka.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaService = app.get(KafkaService);

  await kafkaService.setup();

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        parser: { keepBinary: false },
        subscribe: { fromBeginning: false },
        consumer: {
          groupId: process.env.KAFKA_CONSUMER_ID ?? '',
        },
        client: {
          ssl: false,
          clientId: process.env.KAFKA_CLIENT_ID,
          brokers: [process.env.KAFKA_BROKER_1 ?? ''],
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
