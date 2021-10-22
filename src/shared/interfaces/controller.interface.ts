import { Router } from 'express';

export default interface Controller {
  path: string;
  route: Router;
  initializeRoutes(): void;
}
