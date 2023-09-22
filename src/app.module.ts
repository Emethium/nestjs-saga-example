import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './core/common/common.module';
import { AccountModule } from './domain/account/account.module';
import { AccountHandlers } from './domain/account/commands/handlers';
import { AccountSaga } from './domain/account/sagas/account.saga';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, CommonModule, AccountModule],
  controllers: [AppController],
  providers: [AppService, AccountSaga, ...AccountHandlers],
})
export class AppModule {}
