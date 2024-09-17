import { server } from "./bootstrap/server.js";
import AppConfig from "./config/app.config.js";
import { PostgresConnection, MongooseConnection } from "./config/db.config.js";

const bootstrap = async () => {
  try {
    new PostgresConnection();
    new MongooseConnection();
    const port = parseInt(AppConfig.getOrThrow("port"));
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error.bind(console, error);
    process.exit(1);
  }
};

bootstrap();
