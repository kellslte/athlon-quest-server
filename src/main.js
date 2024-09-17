import { server } from "./bootstrap/server.js";
import AppConfig from "./config/app.config.js";

(async () => {
  try {
    const port = parseInt(AppConfig.getOrThrow("port"));
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error.bind(console, error);
    process.exit(1);
  }
})();
