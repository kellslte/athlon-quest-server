import AppConfig from "./app.config.js";
import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import { createClient } from "redis";

class Database {
  async boot() {
    const postgresCofig = {
      uri: AppConfig.getOrThrow("postgresql_uri"),
    };
    const redisConfig = {
      host: AppConfig.getOrThrow("redis_host"),
      port: AppConfig.getOrThrow("redis_port"),
      retryStrategy: (options) => {
        if (options.attempt > 5) {
          // End retrying after 5 attempts
          return new Error(
            "The retry strategy has exhausted its maximum attempts."
          );
        }
        // Retry after 1 second
        return Math.min(options.attempt * 1000, 30000);
      },
    };
    const mongodbConfig = {
      uri: AppConfig.getOrThrow("mongodb_uri"),
    };

    try {
      await this.initializeConnectionToMongoDB(mongodbConfig);
      const redisClient = await this.initializeConnectionToRedis(redisConfig);
      const sequelize = await this.initializeConnectionToPostgreSQL(
        postgresCofig
      );

      return {
        sequelize,
        redisClient,
      };
    } catch (error) {
      console.error(
        `Failed to initialize database connections: ${error.message}`
      );
      process.exit(1);
    }
  }

  async initializeConnectionToPostgreSQL(config) {
    const sequelize = new Sequelize(config.uri);
    try {
      await sequelize.authenticate();
      console.log("Connected to PostgreSQL database");
    } catch (error) {
      throw error;
    }

    return sequelize;
  }

  async initializeConnectionToMongoDB(config) {
    mongoose.connect(config.uri);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB database");
    });
    mongoose.connection.on("error", () => {
      console.error("Failed to connect to MongoDB database");
    });
  }

  async initializeConnectionToRedis(config) {
    const client = createClient(config).on("error", (e) => {
      console.error(`Redis connection error: ${e}`);
    });

    try {
      await client.connect();
      console.log("Connected to Redis database");
      return client;
    } catch (error) {
      throw error;
    }
  }
}

export default Database;
