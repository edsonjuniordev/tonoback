export class AccountNotFoundException extends Error {
  constructor(message: string = 'Account not found') {
    super(message);
    this.name = AccountNotFoundException.name;
  }
}
