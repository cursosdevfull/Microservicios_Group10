import MySQLBootstrap from "./bootstrap/mysql";
import RedisBootstrap from "./bootstrap/redis";
import ServerBootstrap from "./bootstrap/server";
import logger from "./core/utils/logger";
import { MedicProps } from "./module/medic/domain/roots/medic";
import { MedicFactory } from "./module/medic/domain/roots/medic.factory";

const server = new ServerBootstrap();
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

    const medicProps: MedicProps = {
      id: "63a7da77-f49a-45fc-a282-9b5527e0ebd7",
      name: "John",
      lastname: "Doe",
      email: "john.doe@email.com",
      phone: "1234567890",
      address: ["Fake Street 123"],
      dni: "12345678",
      cmp: "123456",
    };

    const medic = MedicFactory.create(medicProps);

    medic.delete();
    medic.update({ name: "Jane" });

    console.log(medic);
  } catch (error) {
    logger.error(error);
    server.close();
    mysql.close();
  }
})();
