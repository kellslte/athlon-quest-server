import SequelizeConnection from "../db/index.js";
import AppConfig from "./app.config.js";
import mongoose from "mongoose";

const sequelize = new SequelizeConnection().getInstance();

class PostgresConnection {
  /**
   * Establishes a connection to the PostgreSQL database. If the connection is
   * successful, logs a message to the console. The connection is established
   * using Sequelize's `authenticate` method. After the connection is established,
   * calls `sync` on the Sequelize instance to synchronize the database schema
   * with the defined models. The `logging` option is used to print the SQL query
   * to the console whenever a query is executed. The query is only logged if the
   * environment is not set to "test".
   */
  static connect() {
    sequelize.authenticate().then(() => {
      AppConfig.getOrThrow("node_env") !== "test" &&
        console.log("Connected to PostgreSQL database");
    });
    sequelize.sync({
      /**
       * A function that Sequelize will call when a SQL query is executed. Prints the SQL query to the console.
       * @param {string} sql The SQL query being executed.
       */
      logging: function (sql) {
        if (AppConfig.getOrThrow("node_env") !== "test") {
          console.log(`${sql}`);
        }
      },
    });
  }
}

class MongooseConnection {
  /**
   * Establishes a connection to the MongoDB database. The connection is
   * established by calling `mongoose.connect` with the correct URI for the given
   * environment. If the connection is successful, logs a message to the console.
   * @param {string} environment - The environment to connect to MongoDB in. If
   *   not specified, defaults to "development".
   */
  static connect(environment) {
    let uri;
    switch (environment) {
      case "development":
        uri = AppConfig.getOrThrow("mongodb_uri_development");
        break;
      case "production":
        uri = AppConfig.getOrThrow("mongodb_uri_production");
        break;
      default:
        uri = "mongodb://localhost:27017/test_athlon_quest_collections";
        break;
    }

    mongoose.connect(uri);
    mongoose.connection.on("connected", () => {
      environment !== "test" && console.log("Connected to MongoDB database");
    });
    mongoose.connection.on("error", () => {
      console.error("Failed to connect to MongoDB database");
    });
  }
}

export { PostgresConnection, MongooseConnection, sequelize };
