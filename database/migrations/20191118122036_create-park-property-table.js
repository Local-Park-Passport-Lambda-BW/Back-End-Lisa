exports.up = function(knex) {
    return knex.schema.createTable("park_properties", park_property => {
      park_property.increments();
      park_property
        .integer("park_id")
        .notNullable()
        .references("id")
        .inTable("parks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        park_property
        .integer("property_id")
        .notNullable()
        .references("id")
        .inTable("properties")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("park_properties");
  };