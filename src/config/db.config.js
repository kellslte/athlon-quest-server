import AppConfig from "./app.config.js";
import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import { createClient } from "redis";

const sequelize = new Sequelize(AppConfig.getOrThrow("postgresql_uri"));

class PostgresConnection {
  constructor() {
    try {
      sequelize.authenticate().then(() => {
        console.log("Connected to PostgreSQL database");
      } );
      sequelize.sync();
    } catch (error) {
      throw error;
    }
  }
}

class MongooseConnection {
  constructor() {
    mongoose.connect(AppConfig.getOrThrow("mongodb_uri"));
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB database");
    });
    mongoose.connection.on("error", () => {
      console.error("Failed to connect to MongoDB database");
    });
  }
}

export { PostgresConnection, sequelize, MongooseConnection };
