exports.seed = function(knex) {
  return knex("properties")
    .del()
    .then(function() {
      return knex("properties").insert([
        {
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
        }
      ]);
    });
};
