const db = require("../database/db-config.js");

module.exports = {
  find,
  add,
  findById,
  findFacilities,
  getRatings,
  update,
  remove
};

function find() {
  return db("parks as p").select(
    "id",
    "name",
    "description",
    "city",
    "country"
  );
}

function add(park) {
  return db("parks")
    .insert(park, "id")
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
  return db("parks")
    .where({ id })
    .first();
}

function findFacilities(id) {
  return db("parks as p")
    .select("pr.name", "pr.description")
    .join("park_properties as pp", "p.id", "pp.park_id")
    .join("properties as pr", "pp.property_id", "pr.id")
    .where("p.id", id);
}

function getRatings(id) {
  return db("ratings as r")
    .select("r.rating", "r.comment", "p.name")
    .join("parks as p", "r.park_id", "p.id")
    .join("users as u", "r.user_id", "u.id")
    .where("p.id", id);
}

function update(changes, id) {
  return db("parks")
    .update(changes)
    .where({ id });
}

function remove(id) {
  return db("parks")
    .where("id", id)
    .del();
}
