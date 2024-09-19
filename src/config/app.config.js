import { config } from "dotenv";

class AppConfig {
  static get(key) {
    config();
    return process.env[String(key).toUpperCase()];
  }

  static getOrThrow(key) {
    const value = this.get(key);
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  }

  static excludedRoutes() {
    return [
      "/auth/login",
      "/auth/logout",
      "/auth/register",
      "/tracks",
      "/tracks/:id",
      "/health",
      "/",
    ];
  }
}

export default AppConfig;
