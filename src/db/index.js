import AppConfig from "../config/app.config.js";
import { Sequelize } from "sequelize";

class SequelizeConnection {
  constructor() {
    let uri;
    switch (AppConfig.getOrThrow("node_env")) {
      case "development":
        uri = AppConfig.getOrThrow("postgresql_uri_development");
        break;
      case "production":
        uri = AppConfig.getOrThrow("postgresql_uri_production");
        break;
      default:
        uri = "sqlite::memory";
    }
    this.instance = new Sequelize(uri);
  }

  getInstance() {
    return this.instance;
  }
}

export default SequelizeConnection;
