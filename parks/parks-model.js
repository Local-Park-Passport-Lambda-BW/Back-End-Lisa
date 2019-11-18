const db = require('../database/db-config.js');

module.exports = {
    // add,
    find,
    // findBy,
    // findById,
  };

  function find() {
    return db('parks as p')
    .select('id', 'name', 'description', 'city', 'country');
  }
  
//   SELECT p.name, pr.name
// from park_properties as pp
// join parks as p
// on p.id = pp.park_id
// join properties as pr
// on pr.id = pp.property_id
