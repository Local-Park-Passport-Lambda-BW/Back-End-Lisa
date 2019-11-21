const knex = require("../database/db-config");
const request = require("supertest");
const server = require("../api/server");

beforeAll(() => {
  return knex.seed.run();
});

let token;

describe("parks-router", () => {
  describe("POST /users/register", () => {
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
  describe("GET /", () => {
    test("retrieves the list of parks", async () => {
      const response = await request(server).get("/");
      expect(200);
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
  describe("POST /parks", () => {
    const newPark = {
      name: "testPark",
      city: "testCity",
      country: "testCountry",
      description: "testdescription"
    };
    test("Allows user to post a new park", () => {
      return request(server)
        .post("/parks")
        .send(newPark)
        .expect(201)
        .expect({
          id: 4,
          name: "testPark",
          city: "testCity",
          country: "testCountry",
          description: "testdescription"
        });
    });
  });
  describe("GET /parks/:id/facilities", () => {
    test("returns the correct facilities for park 1", () => {
      return request(server)
        .get("/parks/1/facilities")
        .expect(200)
        .expect([
          {
            facility_name: "wildlife",
            description: "A good place to spot local wildlife"
          },
          {
            facility_name: "toilets",
            description: "Toilets are available all day"
          },
          {
            facility_name: "picnic area",
            description:
              "There are designated picnic areas with tables and seating"
          },
          { facility_name: "cafe", description: "There is a cafe onsite" },
          {
            facility_name: "trees",
            description: "A good place to climb or study trees"
          },
          {
            facility_name: "plants",
            description: "A wide variety of plants can be found at this park"
          }
        ]);
    });
  });
  describe("GET /parks/facilities", () => {
    test("returns a list of all ten facilities", () => {
      return request(server)
        .get("/parks/facilities")
        .expect(200).expect[
        ({
          name: "walking trails",
          description:
            "This park contains clearly marked walking trails for hiking"
        },
        {
          name: "dog-friendly",
          description:
            "This park welcomes dogs and provides facilities for dog waste and off-lead play"
        },
        {
          name: "play area",
          description: "Play area or playground facilities availble"
        },
        {
          name: "wildlife",
          description: "A good place to spot local wildlife"
        },
        { name: "toilets", description: "Toilets are available all day" },
        {
          name: "picnic area",
          description:
            "There are designated picnic areas with tables and seating"
        },
        { name: "cafe", description: "There is a cafe onsite" },
        {
          name: "cycling",
          description: "A good park for cycling: may include cycle lanes"
        },
        { name: "trees", description: "A good place to climb or study trees" },
        {
          name: "plants",
          description: "A wide variety of plants can be found at this park"
        })
      ];
    });
  });
  describe("GET /parks/:id returns a park and all park details", () => {
    test("GET /parks/:id", () => {
      return request(server)
        .get("/parks/1")
        .expect(200)
        .expect({
          id: 1,
          name: "Botanic Gardens",
          city: "Belfast",
          country: "Northern Ireland",
          description: "A very popular park beside the Ulster Museum",
          facilities: [
            {
              facility_name: "wildlife",
              description: "A good place to spot local wildlife"
            },
            {
              facility_name: "toilets",
              description: "Toilets are available all day"
            },
            {
              facility_name: "picnic area",
              description:
                "There are designated picnic areas with tables and seating"
            },
            { facility_name: "cafe", description: "There is a cafe onsite" },
            {
              facility_name: "trees",
              description: "A good place to climb or study trees"
            },
            {
              facility_name: "plants",
              description: "A wide variety of plants can be found at this park"
            }
          ]
        });
    });
  });
    describe("PUT /parks/:id allows a user to update a park with a token", () => {
        test("PUT /parks/:id", () => {
            return request(server)
            .put("/parks/1")
            .send({
                name: "Botanic Gardens",
                city: "Belfast",
                country: "Northern Ireland",
                description: "A very popular park beside the Ulster Museum. Everyone should visit at least once, for sure!"
            })
            .set("authorization", token)
            .expect(200)
         
        })
    })
});
