import AppConfig from "../../config/app.config.js";
import morgan from "morgan";

class Logger {
  static handle() {
    if (AppConfig.get("NODE_ENV") === "development") {
      return morgan("dev");
    }
    return morgan("combined");
  }
}

export default Logger;
