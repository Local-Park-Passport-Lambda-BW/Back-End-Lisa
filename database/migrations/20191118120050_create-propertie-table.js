exports.up = function(knex) {
  return knex.schema.createTable("properties", properties => {
    properties.increments();
    properties.string("name", 128).notNullable();
    properties.string("description", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("properties");
};
