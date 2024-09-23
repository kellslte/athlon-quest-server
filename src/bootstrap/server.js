import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { appRouter } from "../routes/app.router.js";
import { createServer } from "http";
import errorHandler from "../app/middleware/error.middleware.js";
import Logger from "../app/middleware/loggerr.middleware.js";
import cookieParser from "cookie-parser";
import RouterConfig from "../config/routes.config.js";
import { MongooseConnection, PostgresConnection } from "../config/db.config.js";
import AppConfig from "../config/app.config.js";
import CacheService from "../config/redis.config.js";

class Application {
  /**
   * Constructs an instance of the Application class
   *
   * @constructor
   * @memberof Application
   * @instance
   *
   * @description
   * This constructor sets up a new express instance and a Redis
   * provider with the environment variable set to the value of
   * `NODE_ENV`. If the environment variable is not set, an error
   * is thrown.
   */
  constructor() {
    this.expressInstance = express();
    this.cache = new CacheService().getInstance();
    this.environment = AppConfig.getOrThrow("node_env");
  }

  /**
   * Configure the application instance
   *
   * @description
   * This method configures the application instance by
   * setting up the middleware, routes, error handling and database
   * connections.
   *
   * @method configure
   * @memberof Application
   * @instance
   */
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

  /**
   * Configure the routes for the application
   *
   * @description
   * This method configures the routes for the application by
   * mounting the application router at the "/api/v1" path and
   * caching the routes using the `RouterConfig.cacheRoutes` method.
   *
   * @method routes
   * @memberof Application
   * @instance
   */
  routes() {
    this.expressInstance.use("/api/v1", appRouter);
    RouterConfig.cacheRoutes(this.expressInstance);
  }

  /**
   * Configure the middleware for the application
   *
   * @description
   * This method configures the middleware for the application by
   * setting up the express.json(), express.urlencoded(), compression,
   * helmet, cors, cookie-parser and a custom logger middleware.
   *
   * @method middleware
   * @memberof Application
   * @instance
   */
  middleware() {
    this.expressInstance.use(express.json());
    this.expressInstance.use(express.urlencoded({ extended: true }));
    this.expressInstance.use(compression());
    this.expressInstance.use(helmet());
    this.expressInstance.use(cors());
    this.expressInstance.use(cookieParser());
    this.expressInstance.use(Logger.handle());
  }

  /**
   * Connect to the database
   *
   * @description
   * This method connects to the MongoDB and PostgreSQL databases
   * using the `MongooseConnection.connect` and `PostgresConnection.connect`
   * methods.
   *
   * @method database
   * @memberof Application
   * @instance
   */
  database() {
    // Connect to your database here
    MongooseConnection.connect(this.environment);
    PostgresConnection.connect();
  }

  /**
   * Configure error handling for the application
   *
   * @description
   * This method configures error handling for the application by
   * setting up a middleware to catch and handle all errors.
   *
   * @method error
   * @memberof Application
   * @instance
   */
  error() {
    this.expressInstance.use((err, req, res, next) => {
      errorHandler.handle(err, req, res, next);
    });
  }

  /**
   * Start the server
   *
   * @description
   * This method starts the server by listening on a given port.
   *
   * @param {number} port - The port number to listen on.
   *
   * @memberof Application
   * @instance
   */
  start(port) {
    const server = createServer(this.expressInstance);
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
  catch(error) {
    console.error.bind(console, error);
    process.exit(1);
  }
}

export default Application;
