export class MedicDatabaseException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "MedicDatabaseException";
    this.message = message;
    Object.setPrototypeOf(this, MedicDatabaseException.prototype);
  }
}
