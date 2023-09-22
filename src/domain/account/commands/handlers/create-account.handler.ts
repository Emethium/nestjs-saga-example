import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Injectable, Logger } from '@nestjs/common';
import { CreateAccountCommand } from '../create-account.command';
import { MongoDBService } from 'src/core/database/mongodb.service';
import { Account } from '../../entities/account.entity';
import { nanoid } from 'nanoid';

@Injectable()
@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  public constructor(
    private readonly db: MongoDBService,
    private readonly logger: Logger,
  ) {}

  public async execute(command: CreateAccountCommand): Promise<Account> {
    const { name, email } = command;

    this.logger.log('Starting the create account handler...');

    const account = await this.db.accountCollection.insertOne({
      _id: nanoid(),
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.logger.log('Account created successfully!');

    return account;
  }
}
