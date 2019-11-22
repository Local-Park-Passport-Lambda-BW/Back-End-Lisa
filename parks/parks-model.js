const db = require("../database/db-config.js");

module.exports = {
  find,
  add,
  findById,
  findFacilities,
  getRatings,
  update,
  remove,
  getParkById,
  addRating,
  getAllFacilities,
  addFacility,

};

function find() {
  return db("parks as p")
    .select("p.id", "p.name", "p.description", "p.city", "p.country")
    .avg("ratings.rating as average_rating")
    .leftJoin("ratings", "p.id", "ratings.park_id")
    .groupBy("p.id", "p.name", "p.description", "p.city", "p.country");
}


function add(park) {
  return db("parks")
    .insert(park, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function addFacility(facility) {
  return db("park_properties")
    .insert(facility, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function getAllFacilities() {
  return db("properties");
}

function addRating(rating) {
  return db("ratings")
    .insert(rating, "id")
    .then(ids => {
      const [id] = ids;
      return findRatingById(id);
    });
}

function findRatingById(id) {
  return db("ratings")
    .where({ id })
    .first();
}

function findById(id) {
  return db("parks")
    .where({ id })
    .first();
}

function findFacilities(id) {
  return db("parks as p")
    .select("pr.name as facility_name", "pr.description")
    .join("park_properties as pp", "p.id", "pp.park_id")
    .join("properties as pr", "pp.property_id", "pr.id")
    .where("p.id", id);
}

function getRatings(id) {
  return db("ratings as r")
    .select("r.rating", "r.comment", "p.name", "r.user_id")
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

function getParkById(id) {
  return db
    .select(
      "p.id",
      "p.name as park_name",
      "p.city",
      "p.description as park_description",
      "pr.name as property_name",
      "pr.description as property_description"
    )
    .from("parks as p")
    .join("properties as pr", "p.id", "pr.id")
    .join("park_properties as pp", "p.id", "pp.park_id")
    .where("p.id", id);
}
