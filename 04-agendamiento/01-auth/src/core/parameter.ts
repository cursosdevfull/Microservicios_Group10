export class Parameter {
  static get PORT() {
    return Number(process.env.APPLICATION_PORT) || 3000;
  }

  static get SERVICE_USER_BY_EMAIL() {
    return (
      process.env.SERVICE_USER_BY_EMAIL ||
      "http://localhost:3000/user/user-by-email"
    );
  }

  static get JWT_SECRET() {
    return process.env.TOKEN_SECRET || "secret";
  }

  static readonly ENVIRONMENT = process.env.NODE_ENV || "development";
}
