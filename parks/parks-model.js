const db = require('../database/db-config.js');

module.exports = {
    // add,
    find,
    // findBy,
    // findById,
  };

  function find() {
    return db('parks').select('id', 'name', 'description', 'city', 'country');
  }
  