import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAccountDto } from './domain/account/entities/account.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_ACCOUNT_KAFKA_TOPIC } from './core/event-bus/kafka.configuration';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAccountCommand } from './domain/account/commands/create-account.command';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('event/account/create')
  async publishCreateAccountEvent(@Body() dto: CreateAccountDto) {
    return this.appService.publishCreateAccountEvent(dto);
  }

  @MessagePattern(CREATE_ACCOUNT_KAFKA_TOPIC)
  async createAccount(@Payload() dto: CreateAccountDto) {
    const { name, email } = dto;
    return this.commandBus.execute(new CreateAccountCommand(name, email));
  }
}
