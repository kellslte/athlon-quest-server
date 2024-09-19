import { MongooseConnection } from "../../config/db.config.js";
import RoleSeeder from "./roles.seeder.js";
import UserSeeder from "./user.seeder.js";

class DatabaseSeeder {
  static async registerSeeders() {
    return [new UserSeeder(), new RoleSeeder()];
  }

  static async run() {
    new MongooseConnection();
    const seeders = await DatabaseSeeder.registerSeeders();

    for (const seeder of seeders) {
      await seeder.run();
    }
  }
}

export default DatabaseSeeder;
