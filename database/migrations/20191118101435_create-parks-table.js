
exports.up = function(knex) {
    return knex.schema.createTable("parks", parks => {
      parks.increments();
      parks.string("name", 128).notNullable();
      parks
        .string("city", 128)
        .notNullable()
      parks
        .string("country", 128)
        .notNullable()
      parks.string("description", 355)
      .notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("parks");
  };
  