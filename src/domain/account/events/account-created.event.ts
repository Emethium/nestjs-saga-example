export class AccountCreatedEvent {
  constructor(
    public readonly _id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
