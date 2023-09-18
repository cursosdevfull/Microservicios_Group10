import { MySQLConfig } from './interface/mysql';
import { RedisConfig } from './interface/redis';

export class Parameter {
  static get PORT() {
    return Number(process.env.APPLICATION_PORT) || 3000;
  }

  static get MYSQL_CONFIG(): MySQLConfig {
    return {
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT) || 3306,
      entities: [
        process.env.MYSQL_ENTITIES || "src/**/infrastructure/**/*.entity.ts",
      ],
      username: process.env.MYSQL_USERNAME || "test",
      password: process.env.MYSQL_PASSWORD || "test",
      database: process.env.MYSQL_DATABASE || "course",
      synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || true,
      logging: Boolean(process.env.MYSQL_LOGGING) || true,
      poolSize: Number(process.env.MYSQL_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.MYSQL_MAX_QUERY_EXECUTION_TIME) || 10000,
    };
  }

  static get REDIS_CONFIG(): RedisConfig {
    return {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || "TOP_SECRET",
      maxRetriesPerRequest:
        Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 10,
    };
  }

  static get ENVIRONMENT() {
    return process.env.NODE_ENV || "development";
  }

  static get RABBIT_HOST(): string {
    return process.env.RABBIT_HOST || "localhost:5672";
  }

  static get EXCHANGE_NAME(): string {
    return process.env.EXCHANGE_NAME || "exchange";
  }

  static get EXCHANGE_NAME_ERROR(): string {
    return process.env.EXCHANGE_NAME_ERROR || "exchange-error";
  }

  static get EXCHANGE_TYPE(): string {
    return process.env.EXCHANGE_TYPE || "direct";
  }

  static get ROUTING_KEY(): string {
    return process.env.ROUTING_KEY || "MX";
  }

  static get EXCHANGE_NAME_DLQ(): string {
    return process.env.EXCHANGE_NAME_DLQ || "course-dlq";
  }

  static get ROUTING_KEY_DLQ(): string {
    return process.env.ROUTING_KEY_DLQ || "help-desk";
  }
}
