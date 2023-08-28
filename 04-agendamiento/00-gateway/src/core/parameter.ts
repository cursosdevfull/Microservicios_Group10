export class Parameter {
  static get PORT() {
    return Number(process.env.APPLICATION_PORT) || 3000;
  }

  static get SERVICE_AUTH_LOGIN() {
    return process.env.SERVICE_AUTH_LOGIN || "http://localhost:3010/auth/login";
  }

  static get SERVICE_USER_LIST() {
    return process.env.SERVICE_USER_LIST || "http://localhost:3000/user";
  }

  static get SERVICE_AUTH_VALIDATE_TOKEN() {
    return (
      process.env.SERVICE_AUTH_VALIDATE_TOKEN ||
      "http://localhost:3010/auth/validate-token"
    );
  }

  static readonly ENVIRONMENT = process.env.NODE_ENV || "development";
}
