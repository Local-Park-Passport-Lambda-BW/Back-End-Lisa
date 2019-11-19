const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  getRatings
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getRatings(id){
  return db('ratings as r')
  .select('r.rating', 'r.comment', 'p.name')
  .join('parks as p', 'r.park_id', 'p.id' )
  .join('users as u', 'r.user_id', 'u.id')
  .where('u.id', id)
}