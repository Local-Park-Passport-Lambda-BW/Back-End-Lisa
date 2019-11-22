exports.seed = function(knex) {
  // return knex("users")
  //   .then(function() {
  return knex("users").insert([
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
};
