import dotenv from "dotenv";

import app from "./app";
import MySQLBootstrap from "./bootstrap/mysql";
import RedisBootstrap from "./bootstrap/redis";
import ServerBootstrap from "./bootstrap/server";
import logger from "./core/utils/logger";

dotenv.config();

const server = new ServerBootstrap(app);
const mysql = new MySQLBootstrap();
const redis = new RedisBootstrap();

(async () => {
  try {
    const listPromises = [
      server.initialize(),
      mysql.initialize(),
      redis.initialize(),
    ];

    await Promise.all(listPromises);
    logger.info("MySQL connected successfully");
  } catch (error) {
    logger.error(error);
    server.close();
    mysql.close();
  }
})();
