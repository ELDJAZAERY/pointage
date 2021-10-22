import express from "express";
import errorHandler from "./middlewares/errorHandler";
import initRoutes from "./init/init.routes";
import initMiddlewares from "./init/init.middlewares";
import logger from "./utils/logger";
import "express-async-errors";

class App {
  private app: express.Express;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public lance(): void {
    this.initializeMiddlewares();
    this.initializeControllers();

    this.listenEvent();
  }

  private initializeMiddlewares() {
    initMiddlewares(this.app);
  }

  private initializeControllers() {
    // the auth middleware used with all route controllers except the auth Controller
    initRoutes(this.app);
    // this middleware should be used after the initialization of routes
    this.app.use(errorHandler);
  }

  public listenEvent() {
    this.app.listen(this.port, () => {
      logger.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
