const db = require('../database/db-config.js');

module.exports = {
    find,
  
  };

  function find() {
    return db('parks as p')
    .select('id', 'name', 'description', 'city', 'country');
  }

