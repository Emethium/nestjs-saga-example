export class CreateAccountCommand {
  public constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}
}
