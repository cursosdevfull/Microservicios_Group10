import { DataSource } from "typeorm";

import { Parameter } from "../core/parameter";
import { Bootstrap, BootstrapReturn } from "./bootstrap";

export default class MySQLBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<BootstrapReturn> {
    const mysqlConfig = Parameter.MYSQL_CONFIG;

    MySQLBootstrap.appDataSource = new DataSource({
      type: "mysql",
      ...mysqlConfig,
    });
    return MySQLBootstrap.appDataSource.initialize();
  }
  close(): void {
    MySQLBootstrap.appDataSource?.destroy();
  }

  static getDataSource(): DataSource {
    return MySQLBootstrap.appDataSource;
  }
}
