import RoleService from "../app/services/roles.service.js";
import { MongooseConnection } from "../config/db.config.js";
import { UnauthorizedError } from "./errors.js";
import { faker } from "@faker-js/faker";
import UserService from "../app/services/user.service.js";

const seedRolesAndPermissions = async () => {
  new MongooseConnection();

  const permissions = [
    {
      role: "student",
      permissions: [
        { resource: "chats", actions: ["create", "read", "update", "delete"] },
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
        { resource: "chats", actions: ["create", "read", "update", "delete"] },
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
        { resource: "users", actions: ["create", "read", "update", "delete"] },
        { resource: "roles", actions: ["create", "read", "update", "delete"] },
        {
          resource: "permissions",
          actions: ["create", "read", "update", "delete"],
        },
      ],
    },
    {
      role: "teacher",
      permissions: [
        { resource: "chats", actions: ["create", "read", "update", "delete"] },
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
};

const seedUsers = async () => {
  new MongooseConnection();
  const users = {
    students: [
      {
        email: faker.internet.email(),
        password: "student password",
        role: "student",
        firstName: faker.person.firstName("male"),
        lastName: faker.person.lastName("male"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "male",
      },
      {
        email: faker.internet.email(),
        password: "student password",
        role: "student",
        firstName: faker.person.firstName("female"),
        lastName: faker.person.lastName("female"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "female",
      },
    ],
    teachers: [
      {
        email: faker.internet.email(),
        password: "teacher password",
        role: "teacher",
        firstName: faker.person.firstName("female"),
        lastName: faker.person.lastName("female"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "female",
      },
      {
        email: faker.internet.email(),
        password: "teacher password",
        role: "teacher",
        firstName: faker.person.firstName("male"),
        lastName: faker.person.lastName("male"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "male",
      },
    ],
    admins: [
      {
        email: faker.internet.email(),
        password: "admin password",
        role: "admin",
        firstName: faker.person.firstName("male"),
        lastName: faker.person.lastName("male"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "male",
      },
      {
        email: faker.internet.email(),
        password: "admin password",
        role: "admin",
        firstName: faker.person.firstName("female"),
        lastName: faker.person.lastName("female"),
        phoneNumber: faker.phone.number({ style: "international" }),
        country: faker.location.country(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        primary: true,
        gender: "female",
      },
    ],
  };

  console.info("Seeding users...");
  users.students.forEach(async (user) => {
    await UserService.createUser(user);
  });
  users.teachers.forEach(async (user) => {
    await UserService.createUser(user);
  });
  users.admins.forEach(async (user) => {
    await UserService.createUser(user);
  });
  console.info("Users seeded successfully.");
};

const ms = (duration) => {
  // get the duration as a string a convert it to milliseconds
  const parts = duration.match(/\d+/g);
  const [hours, minutes, seconds] = parts.map(Number);
  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};

export { seedRolesAndPermissions, ms, seedUsers };
