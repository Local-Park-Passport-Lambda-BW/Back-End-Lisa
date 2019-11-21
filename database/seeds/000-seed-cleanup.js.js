exports.seed = async function(knex) {
  if (
    process.env.DB_ENV === "development" ||
    process.env.DB_ENV === "testing"
  ) {
    await knex("park_properties").truncate();
    await knex("ratings").truncate();
    await knex("properties").truncate();
    await knex("parks").truncate();
    await knex("users").truncate();
  }
};