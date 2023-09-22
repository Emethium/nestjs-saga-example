import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import Papr, { Model } from 'papr';
import {
  Account,
  AccountDefault,
  accountSchema,
} from 'src/domain/account/entities/account.entity';

@Injectable()
export class MongoDBService implements OnModuleInit {
  public client: MongoClient;
  private dbUrl: string;
  public papr: Papr;

  public accountCollection: Model<Account, AccountDefault>;

  public constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.papr = new Papr();
    this.dbUrl = this.configService.get('databaseUrl') as string;
  }

  async onModuleInit() {
    this.logger.log('init MongoDBService...');
    await this.connect();
  }

  public async connect(): Promise<void> {
    this.logger.log('Connecting mongo...');
    this.client = await MongoClient.connect(this.dbUrl);

    this.papr.initialize(this.client.db('example'));

    this.accountCollection = this.papr.model('accounts', accountSchema);

    await this.papr.updateSchemas();

    this.logger.log('Mongo connected...');
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
    this.logger.log('Mongo disconnect...');
  }
}
