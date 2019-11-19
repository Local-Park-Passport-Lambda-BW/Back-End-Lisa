const express = require("express");
const Parks = require("./parks-model");
const router = express.Router();

router.get("/", (req,res) => {
    Parks.find()
    .then(parks => res.status(200).json(parks))
    .catch(err => res.status(500).json({
        message: "There was an error fetching the parks: " + err.message
    }))
})

router.post("/", (req, res) => {
    const { name, city, country, description } = req.body;
    const newPark = {
      name,
      city,
      country,
      description
    };
  
    Parks.add(newPark)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error adding the park: " + error.message
        });
      });
  });

  router.get("")

module.exports = router;