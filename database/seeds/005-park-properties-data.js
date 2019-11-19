exports.seed = function(knex) {
  return knex("park_properties")
    .truncate()
    .then(function() {
      return knex("park_properties").insert([
        { park_id: 1, property_id: 4 },
        { park_id: 1, property_id: 5 },
        { park_id: 1, property_id: 6 },
        { park_id: 1, property_id: 7 },
        { park_id: 1, property_id: 9 },
        { park_id: 1, property_id: 10 },
        { park_id: 2, property_id: 2 },
        { park_id: 2, property_id: 4 },
        { park_id: 2, property_id: 5 },
        { park_id: 2, property_id: 9 },
        { park_id: 2, property_id: 10 },
        { park_id: 3, property_id: 1 },
        { park_id: 3, property_id: 2 },
        { park_id: 3, property_id: 3 },
        { park_id: 3, property_id: 4 },
        { park_id: 3, property_id: 9 },
        { park_id: 3, property_id: 5 }
      ]);
    });
};
