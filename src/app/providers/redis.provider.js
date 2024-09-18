import AppConfig from "../../config/app.config.js";
import redis from "redis";

class RedisProvider {
  constructor() {
    const client = redis.createClient({
      url: AppConfig.getOrThrow("redis_url"),
    });

    client.on("connect", () => {
      console.log("Connected to Redis");
    });
    client.on("error", (err) => {
      console.log("Redis error: ", err);
    });
    client.connect();
    this.client = client;
  }

  async set(key, value, expiresIn = 3600) {
    await this.client.set(key, expiresIn, value);
  }

  async get(key) {
    return await this.client.get(key);
  }
}

export default RedisProvider;
