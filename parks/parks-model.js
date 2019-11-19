const db = require('../database/db-config.js');

module.exports = {
    find,
    add,
    findById,
  
  };

  function find() {
    return db('parks as p')
    .select('id', 'name', 'description', 'city', 'country');
  }

  function add(park) {
    return db('parks')
      .insert(park, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }

  function findById(id) {
    return db('parks')
      .where({ id })
      .first();
  }

