import RedisProvider from "../app/providers/redis.provider.js";

class CacheService {
  constructor() {
    this.cache = new RedisProvider();
  }

  /**
   * Returns the RedisProvider instance.
   *
   * @returns {RedisProvider} The RedisProvider instance.
   */
  getInstance() {
    return this.cache;
  }

  /**
   * Closes the Redis connection.
   */
  quit() {
    this.cache.quit();
  }
}

export default CacheService;
