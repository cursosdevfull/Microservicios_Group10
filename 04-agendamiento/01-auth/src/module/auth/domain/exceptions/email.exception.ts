export class EmailException extends Error {
  constructor() {
    super();
    this.name = "EmailException";
    this.message = "Invalid email";
    Object.setPrototypeOf(this, EmailException.prototype);
  }
}
