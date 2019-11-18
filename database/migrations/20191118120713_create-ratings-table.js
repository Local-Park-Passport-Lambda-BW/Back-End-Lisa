exports.up = function(knex) {
  return knex.schema.createTable("ratings", ratings => {
    ratings.increments();
    ratings.integer("rating");
    ratings.string("comment", 355);
    ratings
      .integer("park_id")
      .notNullable()
      .references("id")
      .inTable("parks")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      ratings
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("ratings");
};
