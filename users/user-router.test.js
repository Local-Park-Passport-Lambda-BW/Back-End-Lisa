const knex = require("../database/db-config");
const request = require("supertest");
const server = require("../api/server");
// const Users = require("./user-model")
// const db = require("../database/db-config")

let token;

beforeAll(() => {
  return knex.seed.run();
});

describe("user-router", () => {
  describe("POST /register", () => {
    test("registers a new user successfully", async () => {
      const response = await request(server)
        .post("/users/register")
        .send({
          name: "test",
          email: "test@test.com",
          username: "test",
          password: "test1"
        });
      expect(200);
    });
  });
  describe("POST /users/login", () => {
    test("logs in a user and returns a token", async () => {
      const response = await request(server)
        .post("/users/login")
        .send({
          username: "test",
          password: "test1"
        })
        .expect(200);

      token = response.body.token;
    });
  });

  describe("GET /users/list/demo", () => {
    test("retrieves the list of users", async () => {
      const response = await request(server).get("/list/demo");
      expect(200);
      expect([
        {
          name: "Ziggy Z",
          username: "Ziggy",
          email: "z@z.com",
          password: "1234"
        },
        {
          name: "Zuri Z",
          username: "Zuri",
          email: "z@zz.com",
          password: "1234"
        },
        {
          name: "Loki L",
          username: "Loki",
          email: "l@l.com",
          password: "1234"
        }
      ]);
    });
  });
    describe("GET /list", () => {
        test("returns list of users in auth route", async () => {
            const response = await request(server)
            .get("/users/list")
            .set("authorization", token)
            .expect(200)
        })
    })
});
