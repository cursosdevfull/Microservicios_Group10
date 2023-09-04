export class IdException extends Error {
  constructor() {
    super();
    this.name = "IdException";
    this.message = "Invalid id";
    Object.setPrototypeOf(this, IdException.prototype);
  }
}
