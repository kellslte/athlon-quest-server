import SequelizeConnection from "../db/index.js";
import AppConfig from "./app.config.js";
import mongoose from "mongoose";

const sequelize = ( new SequelizeConnection() ).getInstance();

class PostgresConnection {
  static connect() {
    try {
      sequelize.authenticate().then(() => {
        AppConfig.getOrThrow("node_env") !== "test" && console.log("Connected to PostgreSQL database");
      });
      sequelize.sync();
    } catch (error) {
      throw error;
    }
  }
}

class MongooseConnection {
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
