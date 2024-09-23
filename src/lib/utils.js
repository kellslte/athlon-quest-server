import Application from "../bootstrap/server.js";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import AppConfig from "../config/app.config.js";

class Utilities {
  /**
   * Converts a duration given as a string in the format "HH:MM:SS" to milliseconds.
   * @param {string} duration - The duration string
   * @returns {number} The duration in milliseconds
   */
  static ms(duration) {
    const parts = duration.match(/\d+/g);
    const [hours, minutes, seconds] = parts.map(Number);
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  }

  /**
   * Updates the .env file with new values
   * @param {Object} payload - An object with key value pairs of environment variables
   * to be updated. The key should be the name of the environment variable and
   * the value should be the new value to be assigned to that variable. If the
   * key does not exist in the .env file, it will be added, otherwise the existing
   * value will be updated.
   */
  static updateEnv(payload) {
    const envPath = resolve(process.cwd(), ".env");
    const envVariables = readFileSync(envPath, "utf8").split("\n");

    // loop over the object we are receiving as a parameter
    for (const [key, value] of Object.entries(payload)) {
      // write a regex to match the key and replace the value
      const regex = new RegExp(`${key}=.*`);

      // check the env variables for the existence of the key
      const keyExists = envVariables.some((envVar) => regex.test(envVar));

      // if the key exists, update the value
      if (keyExists) {
        envVariables.forEach((envVar, index) => {
          if (regex.test(envVar)) {
            envVariables[index] = `${key}=${value}`;
          }
        });
      } else {
        // if the key does not exist, push the new key value pair
        envVariables.push(`${key}=${value}`);
      }

      // write the updated env variables to the .env file
      writeFileSync(envPath, envVariables.join("\n"));
    }
  }

  /**
   * Bootstraps the test environment by setting NODE_ENV to "test"
   * and returning an instance of the express app.
   *
   * @static
   * @memberof Utilities
   * @returns {import("express").Express} The express app instance.
   */
  static bootstrapTestEnvironment() {
    this.updateEnv({ NODE_ENV: "test" });
    const app = new Application();
    app.configure();
    return app.expressInstance;
  }
}

export default Utilities;
