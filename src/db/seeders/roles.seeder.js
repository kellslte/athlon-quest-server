import RoleService from "../../app/services/roles.service.js";

class RoleSeeder {
  async run() {
    await this.seed();
  }

  async seed() {
    const permissions = [
      {
        role: "student",
        permissions: [
          {
            resource: "chats",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "assignments",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "courses",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "notifications",
            actions: ["create", "read", "update", "delete"],
          },
          { resource: "profile", actions: ["create", "read", "update"] },
          {
            resource: "settings",
            actions: ["create", "read", "update", "delete"],
          },
        ],
      },
      {
        role: "admin",
        permissions: [
          {
            resource: "chats",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "assignments",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "courses",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "notifications",
            actions: ["create", "read", "update", "delete"],
          },
          { resource: "profile", actions: ["create", "read", "update"] },
          {
            resource: "settings",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "users",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "roles",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "permissions",
            actions: ["create", "read", "update", "delete"],
          },
        ],
      },
      {
        role: "teacher",
        permissions: [
          {
            resource: "chats",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "assignments",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "courses",
            actions: ["create", "read", "update", "delete"],
          },
          {
            resource: "notifications",
            actions: ["create", "read", "update", "delete"],
          },
          { resource: "profile", actions: ["create", "read", "update"] },
          {
            resource: "settings",
            actions: ["create", "read", "update", "delete"],
          },
        ],
      },
    ];

    console.info("Seeding roles and permissions...");

    const roles = await RoleService.getRoles();

    if (roles.length === permissions.length) {
      console.info("Roles and permissions already seeded.");
      return;
    }

    await RoleService.createMany(permissions);

    console.info("Roles and permissions seeded successfully.");
  }
}

export default RoleSeeder;
