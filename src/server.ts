import App from "./app";
import DataBase from "./config/db";
import Postgres from "./config/db/sgbds/postgres.sgbd";
import logger from "./utils/logger";
import envs from "./config/envs";

const startServer = async (): Promise<void> => {
  const serverConfig: any = envs()["server"];

  const DB = new DataBase();
  const postgres = new Postgres();
  const connected = await DB.connect(postgres);

  if (connected) {
    const app = new App(serverConfig.port);
    app.lance();
  } else {
    logger.error("#### Failed to connect to DataBase ####");
  }
};

/**
 *
 * @_START_SERVER_
 *
 */
startServer();
