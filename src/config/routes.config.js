import expressListRoutes from "express-list-routes";
import CacheService from "./redis.config.js";

class RouterConfig {
  static listRoutes(app) {
    return expressListRoutes(app);
  }

  /**
   * Caches all the routes of the application to Redis.
   *
   * This method is used to cache all the routes of the application to Redis.
   * The method first fetches all the routes of the application using the
   * express-list-routes package. It then maps over the routes array and removes
   * "/api/v1" from the path of each route. The resulting routes array is then
   * converted to a JSON string and set in Redis with the key "routes".
   *
   * @param {Express.Application} app - The express application instance.
   */
  static cacheRoutes(app) {
    const routes = this.listRoutes(app).map((route) => {
      return String(route.path).replace("/api/v1", "");
    });
    const cache = new CacheService().getInstance();
    cache.set("routes", JSON.stringify(routes)).then(() => {
      console.log("Routes have been successfully cached");
    });
  }
}

export default RouterConfig;
