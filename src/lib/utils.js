import Application from "../bootstrap/server.js";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

class Utilities {
  static ms(duration) {
    const parts = duration.match(/\d+/g);
    const [hours, minutes, seconds] = parts.map(Number);
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
  }

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

  static bootstrapTestEnvironment() {
    this.updateEnv({ NODE_ENV: "test" });
    const app = new Application();
    app.configure();
    return app.expressInstance;
  }
}

export default Utilities;
