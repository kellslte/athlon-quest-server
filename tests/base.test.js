import request from "supertest";
import Utilities from "../src/lib/utils.js";

const app = Utilities.bootstrapTestEnvironment();

describe("Basic application tests", () => {
  it("should show the server status", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Server is up and running!",
      data: {},
    });
  });

  it("should return a hello world response", async () => {
    const response = await request(app).get("/api/v1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "Hello World!",
      data: {},
    });
  });
});
