import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, delay, map } from 'rxjs';
import { AccountCreatedEvent } from '../events/account-created.event';
import { NotifyAccountCreationCommand } from '../commands/notify-account-creation.command';

@Injectable()
export class AccountSaga {
  @Saga()
  accountCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AccountCreatedEvent),
      delay(1000),
      map((event) => {
        return new NotifyAccountCreationCommand(event.email);
      }),
    );
  };
}
