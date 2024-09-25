// @ts-nocheck
import Application from "./bootstrap/server.js";
import AppConfig from "./config/app.config.js";
import Utilities from "./lib/utils.js";



/**
 * Initializes and starts the server.
 *
 * @async
 * @function
 * @returns {undefined}
 */
const bootstrap = async () => {
  const app = new Application();
  app.configure();
  app.start(AppConfig.getOrThrow("port"));
};

bootstrap();
