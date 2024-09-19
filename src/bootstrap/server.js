import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { appRouter } from "../routes/app.router.js";
import { createServer } from "http";
import errorHandler from "../app/middleware/error.middleware.js";
import Logger from "../app/middleware/loggerr.middleware.js";
import RedisProvider from "../app/providers/redis.provider.js";
import cookieParser from "cookie-parser";
import RouterConfig from "../config/routes.config.js";
import { MongooseConnection, PostgresConnection } from "../config/db.config.js";
import AppConfig from "../config/app.config.js";

class Application {
  constructor() {
    this.expressInstance = express();
    this.cache = new RedisProvider();
    this.environment = AppConfig.getOrThrow("node_env");
  }

  configure() {
    //middleware
    this.middleware();
    // routes
    this.routes();
    // error handling
    this.error();
    // database
    this.database();
  }

  routes() {
    this.expressInstance.use("/api/v1", appRouter);
    RouterConfig.cacheRoutes(this.expressInstance);
  }

  middleware() {
    this.expressInstance.use(express.json());
    this.expressInstance.use(express.urlencoded({ extended: true }));
    this.expressInstance.use(compression());
    this.expressInstance.use(helmet());
    this.expressInstance.use(cors());
    this.expressInstance.use(cookieParser());
    this.expressInstance.use(Logger.handle());
  }

  database() {
    // Connect to your database here
    MongooseConnection.connect(this.environment);
    PostgresConnection.connect();
  }

  error() {
    this.expressInstance.use((err, req, res, next) => {
      errorHandler.handle(err, req, res, next);
    });
  }

  start(port) {
    const server = createServer(this.expressInstance);
    server.listen(parseInt(port), () => {
      console.log(`Server running on port ${port}`);
    });
  }
  catch(error) {
    console.error.bind(console, error);
    process.exit(1);
  }
}

export default Application;
