import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  providers: [...AccountHandlers],
})
export class AccountModule {}
