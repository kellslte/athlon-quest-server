import request from "supertest";
import Utilities from "../../../src/lib/utils.js";
import UserService from "../../../src/app/services/user.service.js";

const app = Utilities.bootstrapTestEnvironment();

beforeEach(async () => {
  await UserService.deleteMany();
});

describe("Tests for the register endpoint", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "v3QGh@example.com",
      password: "password",
      confirm_password: "password",
      role: "admin",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      country: "USA",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      primary: true,
      gender: "male",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should return a validation error if the request contains invalid paramerters", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "doejohn@gmail.com",
      password: "pass",
      confirm_password: "password",
      role: "student",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      country: "USA",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      primary: true,
      gender: "male",
    });

    expect(response.status).toBe(422);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain(
      "The request failed with the following errors"
    );
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].field).toBe("confirm_password");
  });

  it("should return a conflict error if a user with the same email already exists", async () => {
    await request(app).post("/api/v1/auth/register").send({
      email: "doejohn@gmail.com",
      password: "pass",
      confirm_password: "pass",
      role: "student",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      country: "USA",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      primary: true,
      gender: "male",
    });

    const response = await request(app).post("/api/v1/auth/register").send({
      email: "doejohn@gmail.com",
      password: "password",
      confirm_password: "password",
      role: "student",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      country: "USA",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      primary: true,
      gender: "male",
    });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain("This email has been taken");
  });
});
