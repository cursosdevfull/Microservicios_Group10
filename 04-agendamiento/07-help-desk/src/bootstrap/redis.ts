import IORedis from 'ioredis';

import { Parameter } from '../core/parameter';
import logger from '../core/utils/logger';
import { Bootstrap, BootstrapReturn } from './bootstrap';

export default class RedisBootstrap implements Bootstrap {
  private static client: IORedis;
  initialize(): Promise<BootstrapReturn> {
    return new Promise((resolve, reject) => {
      const redisConfig = Parameter.REDIS_CONFIG;
      RedisBootstrap.client = new IORedis(redisConfig);

      RedisBootstrap.client
        .on("connect", () => {
          logger.info("Redis connected successfully");
          resolve(true);
        })
        .on("error", (err) => {
          logger.error(err);
          reject(err);
        });
    });
  }
  close(): void {
    RedisBootstrap.client?.disconnect();
  }
}
