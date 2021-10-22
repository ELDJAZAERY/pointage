import { createConnection } from "typeorm";
import logger from "../../../utils/logger";
import { DBConfig } from "../../envs/envs.type";
import ISgbd from "./sgbd.interface";

export default class PostgresSGBD implements ISgbd {
  private host: string;
  private port: number;
  private user: string;
  private password: string;
  private name: string;

  config(dbConfig: DBConfig) {
    this.host = dbConfig.host;
    this.port = dbConfig.port;
    this.user = dbConfig.user;
    this.password = dbConfig.password;
    this.name = dbConfig.name;
  }

  async connect(dbConfig: DBConfig): Promise<boolean> {
    this.config(dbConfig);

    try {
      await createConnection({
        type: "postgres",
        host: this.host,
        port: this.port,
        name: this.user,
        password: this.password,
        database: this.name,
        entities: [`${__dirname}/../../**/**/*.entity{.ts,.js }`],
        synchronize: process.env.NODE_ENV !== "production",
        logging: false,
      });
      this.success();
      return true;
    } catch (err) {
      this.issue(`${err}`);
      return false;
    }
  }

  success(): void {
    logger.log(
      `#### Successfully connected to Postgress DB ${this.host}/${this.name} ####`
    );
  }

  issue(err: string): void {
    logger.log(
      `#### Failed to connecte to Postgress DB ${this.host}/${this.name} ####`
    );
    logger.log(`${err}`);
  }
}
