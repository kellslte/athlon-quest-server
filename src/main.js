import Application from "./bootstrap/server.js";
import AppConfig from "./config/app.config.js";

const bootstrap = async () => {
  const app = new Application();
  app.configure();
  app.start(AppConfig.getOrThrow("port"));
};

bootstrap();
