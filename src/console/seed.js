import DatabaseSeeder from "../db/seeders/database.seeder.js";

(async () => {
  try {
    await DatabaseSeeder.run();
    console.info("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
