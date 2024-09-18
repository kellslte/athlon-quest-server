import { seedRolesAndPermissions, seedUsers } from "../lib/utils.js";

(async () => {
  try {
    await seedRolesAndPermissions();
    await seedUsers();
    console.info("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
