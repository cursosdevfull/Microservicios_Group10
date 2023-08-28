import dotenv from "dotenv";

import app from "./app";
import ServerBootstrap from "./bootstrap/server";
import logger from "./core/utils/logger";

dotenv.config();

const server = new ServerBootstrap(app);

(async () => {
  try {
    const listPromises = [server.initialize()];

    await Promise.all(listPromises);
  } catch (error) {
    logger.error(error);
    server.close();
  }
})();
