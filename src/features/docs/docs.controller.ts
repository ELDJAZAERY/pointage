import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Controller } from '../../shared';
import JsonAPI from './api.json';

class DocsController implements Controller {
  path = '/api-docs';

  route = Router();

  constructor() {
    this.initializeRoutes();
  }

  customCss = '.swagger-ui .topbar { display: none }';

  initializeRoutes(): any {
    this.route.use(
      '/',
      swaggerUi.serveFiles(JsonAPI, {}),
      swaggerUi.setup(JsonAPI, {
        customCss: this.customCss,
      }),
    );
  }
}

export default DocsController;
