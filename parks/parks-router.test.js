const knex = require("../database/db-config");
const request = require("supertest");
const server = require("../api/server");

beforeAll(() => {
  return knex.seed.run();
});

describe("parks-router", () => {
  describe("GET /", () => {
    test("retrieves the list of parks", async () => {
      const response = await request(server)
        .get("/")
        expect(200)
        expect([
          {
            id: 1,
            name: "Botanic Gardens",
            city: "Belfast",
            country: "Northern Ireland",
            description: "A very popular park beside the Ulster Museum"
          },
          {
            id: 2,
            name: "Ormeau Park",
            city: "Belfast",
            country: "Northern Ireland",
            description: "The oldest park in Belfast, opened in 1871."
          },
          {
            id: 3,
            name: "Victoria Park",
            city: "Belfast",
            country: "Northern Ireland",
            description: "A waterside park beside Belfast Harbour"
          }
        ]);
    });
  });
});
