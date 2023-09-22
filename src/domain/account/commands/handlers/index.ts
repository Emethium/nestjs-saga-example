import { NotifyAccountCreationCommand } from '../notify-account-creation.command';
import { CreateAccountHandler } from './create-account.handler';

export const AccountHandlers = [
  CreateAccountHandler,
  NotifyAccountCreationCommand,
];
