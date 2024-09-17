import { app } from "../../bootstrap/server.js";

class Redis {
  constructor() {
    this.client = app.get("redisClient");
  }
}

export default Redis;
