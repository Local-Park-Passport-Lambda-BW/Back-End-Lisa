exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Ziggy Z",
          username: "Ziggyss",
          email: "z@z.com",
          password: "1234"
        },
        {
          name: "Zuri Z",
          username: "Zuriss",
          email: "z@zz.com",
          password: "1234"
        },
        {
          name: "Loki L",
          username: "Lokiss",
          email: "l@l.com",
          password: "1234"
        }
      ]);
    });
};
