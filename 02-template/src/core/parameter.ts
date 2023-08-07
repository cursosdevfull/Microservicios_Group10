import { MySQLConfig } from "./interface/mysql";
import { RedisConfig } from "./interface/redis";

export class Parameter {
  static readonly PORT = Number(process.env.PORT) || 3000;

  static readonly MYSQL_CONFIG: MySQLConfig = {
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

  static readonly REDIS_CONFIG: RedisConfig = {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "TOP_SECRET",
    maxRetriesPerRequest:
      Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 10,
  };
}
