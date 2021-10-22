import express, { Express } from 'express';
import cors from 'cors';

export default (app: Express): void => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cors());
};
