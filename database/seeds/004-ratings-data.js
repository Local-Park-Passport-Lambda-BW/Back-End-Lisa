exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ratings")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ratings").insert([
        {
          rating: "4",
          comment: "A lovely park - we had a great time.",
          park_id: 1,
          user_id: 1
        },
        {
          rating: "4",
          comment: "Beautiful trees and plants, also very clean.",
          park_id: 2,
          user_id: 2
        },
        {
          rating: "2",
          comment: "There were no dog bins and the toilets were closed!",
          park_id: 3,
          user_id: 3
        }
      ]);
    });
};
