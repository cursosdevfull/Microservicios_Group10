export class UserDatabaseException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UserDatabaseException";
    this.message = message;
    Object.setPrototypeOf(this, UserDatabaseException.prototype);
  }
}
