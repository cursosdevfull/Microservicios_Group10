import express, { Application } from 'express';

import { HandleError } from './core/presentation/handle-error';
import UserRouter from './module/user/presentation/user.route';

class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.handleMiddlewares();
    this.handleRoutes();
    this.handleHealthCheck();
    this.handleErrors();
  }

  handleMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  handleRoutes() {
    this.expressApp.use("/user", UserRouter);
  }

  handleHealthCheck() {
    this.expressApp.get("/health", (req, res) => {
      res.status(200).json({ status: "UP" });
    });

    this.expressApp.get("/healthcheck", (req, res) => {
      res.status(200).json({ status: "UP" });
    });

    this.expressApp.get("/healthz", (req, res) => {
      res.status(200).json({ status: "UP" });
    });

    this.expressApp.get("/", (req, res) => {
      res.status(200).json({ status: "UP" });
    });
  }

  handleErrors() {
    this.expressApp.use(HandleError.noFound);
    this.expressApp.use(HandleError.generic);
  }

  getApp(): Application {
    return this.expressApp;
  }
}

export default new App().getApp();
