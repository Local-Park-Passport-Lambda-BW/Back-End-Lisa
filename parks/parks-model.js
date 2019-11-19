const db = require('../database/db-config.js');

module.exports = {
    find,
    add,
    findById,
    findFacilities,
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

  // function addFacility(facility){
  //   return db('p')
  //   .
  // }

  function findById(id) {
    return db('parks')
      .where({ id })
      .first();
  }

  function findFacilities(id){
    return db('parks as p')
    .select('pr.name', 'pr.description')
    .join('park_properties as pp', 'p.id', 'pp.park_id')
    .join('properties as pr', 'pp.property_id', 'pr.id')
    .where('p.id', id)
  }

 
    

