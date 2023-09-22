import { ConfigService } from '@nestjs/config';

export const CREATE_ACCOUNT_KAFKA_TOPIC = 'account.create';
export const ACCOUNT_CREATED_KAFKA_TOPIC = 'account.created';

export const setupKafkaConfig = (configService: ConfigService) => {
  return {
    clientId: configService.get<string>('kafkaClientId'),
    brokers: [configService.get<string>('kafkaBroker')] as string[],
    ssl: false,
  };
};
