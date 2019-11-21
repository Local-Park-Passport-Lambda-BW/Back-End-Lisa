exports.seed = function(knex) {
  return knex("parks")
    .then(function() {
      return knex("parks").insert([
        {
          name: "Botanic Gardens",
          city: "Belfast",
          country: "Northern Ireland",
          description: "A very popular park beside the Ulster Museum"
        },
        {
          name: "Ormeau Park",
          city: "Belfast",
          country: "Northern Ireland",
          description: "The oldest park in Belfast, opened in 1871."
        },
        {
          name: "Victoria Park",
          city: "Belfast",
          country: "Northern Ireland",
          description: "A waterside park beside Belfast Harbour"
        }
      ]);
    });
};
