import AppConfig from "../../config/app.config.js";
import redis from "redis";
import { promisify } from "util";

class RedisProvider {
  /**
   * Constructs a new RedisProvider instance and sets up a Redis client.
   *
   * @description
   * The constructor sets up a Redis client using the `redis` package and
   * promisifies some of the most commonly used methods for use with async/await.
   * It also sets up event listeners for the "connect" and "error" events.
   * When the Redis client successfully connects to the Redis server, it logs
   * a message to the console unless the environment variable NODE_ENV is
   * set to "test". When an error occurs, it logs the error to the console.
   *
   * @memberof RedisProvider
   * @instance
   */
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

    // Promisify Redis client methods to use async/await
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.zaddAsync = promisify(this.client.zAdd).bind(this.client);
    this.zrangeAsync = promisify(this.client.zRange).bind(this.client);
    this.zincrbyAsync = promisify(this.client.zIncrBy).bind(this.client);
  }

  /**
   * Sets a value in the Redis cache by key, with an optional expiration.
   *
   * @param {string} key - The key to set in the cache.
   * @param {*} value - The value to set in the cache.
   * @param {number} [expiration=3600] - The number of seconds to keep the
   *   cached value before it expires. If omitted, the cached value will not
   *   expire.
   *
   * @returns {Promise<void>} A promise that resolves when the cache is set.
   *   If there is an error, it is logged to the console.
   */
  async set(key, value, expiration = 3600) {
    return this.setAsync(key, JSON.stringify(value), "EX", expiration).catch(
      (error) => {
        console.error(`Error setting cache for key ${key}:`, error);
      }
    );
  }

  /**
   * Retrieves a value from the Redis cache by key.
   *
   * @param {string} key - The key to retrieve from the cache.
   *
   * @returns {Promise<*>} A promise that resolves with the value associated
   *   with the key, parsed from JSON if the key exists, or `null` if the key
   *   does not exist. If there is an error, it is logged to the console.
   */
  async get(key) {
    return this.getAsync(key)
      .then((result) => (result ? JSON.parse(result) : null))
      .catch((error) => {
        console.error(`Error fetching cache for key ${key}:`, error);
        return null;
      });
  }

  /**
   * Creates a new Redis leaderboard for the given track ID.
   *
   * @param {string} trackId - The ID of the track to create a leaderboard for.
   *
   * @returns {Promise<void>} A promise that resolves when the leaderboard
   *   creation is complete.
   */
  async createLeaderboard(trackId) {
    const key = `leaderboard:${trackId}`;
    await this.zaddAsync(key, 0, trackId); // Create the leaderboard with one element
  }

  /**
   * Updates a user's score on a leaderboard.
   *
   * @param {string} trackId - The ID of the track to update the leaderboard for.
   * @param {string} userId - The ID of the user to update the score for.
   * @param {number} score - The amount to add to the user's existing score.
   *
   * @returns {Promise<void>} A promise that resolves when the leaderboard
   *   update is complete.
   */
  async updateLeaderboard(trackId, userId, score) {
    const key = `leaderboard:${trackId}`;
    // ZINCRBY: Increment user score by the given amount. If the user doesn't exist, create them with this score.
    // This is more efficient than using ZADD because it doesn't recalculate the entire leaderboard.
    await this.zincrbyAsync(key, score, userId).catch((error) => {
      console.error(`Error updating leaderboard for track ${trackId}:`, error);
    });
  }

  /**
   * Deducts the given number of points from the given user's score on the given
   * leaderboard.
   *
   * @param {string} trackId - The ID of the track to deduct points from.
   * @param {string} userId - The ID of the user to deduct points from.
   * @param {number} points - The number of points to deduct.
   *
   * @returns {Promise<void>} A promise that resolves when the leaderboard
   *   update is complete.
   */
  async deductPoints(trackId, userId, points) {
    const key = `leaderboard:${trackId}`;
    await this.client.zIncrBy(key, -points, userId).catch((error) => {
      console.error(
        `Error deducting points for user ${userId} on track ${trackId}:`,
        error
      );
    });
  }

  /**
   * Retrieves a range of users from a leaderboard, sorted by score descending.
   *
   * @param {string} trackId - The ID of the track to retrieve the leaderboard from.
   * @param {number} [start=0] - The starting index of users to retrieve. Defaults to 0.
   * @param {number} [stop=-1] - The stopping index of users to retrieve. Defaults to -1.
   *
   * @returns {Promise<Array<{userId: string, score: number}>>} A promise that resolves with an array of users, each with their user ID and score.
   */
  async rankUsers(trackId, start = 0, stop = -1) {
    const key = `leaderboard:${trackId}`;
    const leaderboard = await this.zrangeAsync(key, start, stop, "WITHSCORES");

    return leaderboard.reduce((acc, val, index) => {
      if (index % 2 === 0) {
        return [...acc, { userId: val, score: leaderboard[index + 1] }];
      }
      return acc;
    }, []);
  }

  /**
   * Retrieves the entire leaderboard for a given track.
   *
   * @param {string} trackId - The ID of the track to retrieve the leaderboard from.
   *
   * @returns {Promise<Array<{userId: string, score: number}>>} A promise that resolves with an array of users, each with their user ID and score.
   */
  async getTrackBoard(trackId) {
    const key = `leaderboard:${trackId}`;
    const leaderboard = await this.zrangeAsync(key, 0, -1, "WITHSCORES");
    return leaderboard.reduce((acc, val, index) => {
      if (index % 2 === 0) {
        return [...acc, { userId: val, score: leaderboard[index + 1] }];
      }
      return acc;
    }, []);
  }

  quit() {
    this.client.quit();
  }
}

export default RedisProvider;
