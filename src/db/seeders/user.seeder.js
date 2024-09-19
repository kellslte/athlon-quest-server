import UserService from "../../app/services/user.service.js";
import { faker } from "@faker-js/faker";

class UserSeeder {
  async run() {
    await this.seed();
  }

  async seed() {
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
  }
}

export default UserSeeder;
