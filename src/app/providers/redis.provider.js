import AppConfig from "../../config/app.config.js";
import redis from "redis";

class RedisProvider {
  constructor() {
    const client = redis.createClient();
    client.on("connect", () => {
      AppConfig.getOrThrow("node_env") !== "test" &&
        console.log("Connected to Redis");
    });
    client.on("error", (err) => {
      console.log("Redis error: ", err);
    });
    client.connect();
    this.client = client;
  }

  async set(key, value, expiresIn = 3600) {
    await this.client.set(key, value, expiresIn);
  }

  async get(key) {
    return await this.client.get(key);
  }
}

export default RedisProvider;
