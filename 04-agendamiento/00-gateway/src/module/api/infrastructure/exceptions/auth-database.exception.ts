export class AuthDatabaseException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AuthDatabaseException";
    this.message = message;
    Object.setPrototypeOf(this, AuthDatabaseException.prototype);
  }
}
