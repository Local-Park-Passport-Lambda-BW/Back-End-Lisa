const express = require("express");
const Parks = require("./parks-model");
const router = express.Router();
const restricted = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Parks.find()
    .then(parks => res.status(200).json(parks))
    .catch(err =>
      res.status(500).json({
        message: "There was an error fetching the parks: " + err.message
      })
    );
});

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
    .catch(err => {
      res.status(500).json({
        message: "There was an error adding the park: " + err.message
      });
    });
});

router.get("/:id/facilities", (req, res) => {
  const { id } = req.params;
  Parks.findFacilities(id)
    .then(park => {
      res.status(200).json(park);
      console.log(park);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching the park details: " + err.message
      });
    });
});

router.get("/facilities", (req, res) => {
  Parks.getAllFacilities()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const park = Parks.findById(id);
  const facilities = Parks.findFacilities(id);
  Promise.all([park, facilities])
    .then(data => {
      const result = {
        ...data[0],
        facilities: data[1]
      };
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching the park: " + err.message
      });
    });
});

router.post("/:id", (req, res) => {
  const park_id = req.params.id;
  const property_id = req.body.property_id;
  const facility = { park_id, property_id };
  Parks.addFacility(facility)
    .then(() => {
      res.status(200).json({message: "Facility successfully added to park."});
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding facility: " + err.message
      });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Parks.findById(id)
    .then(park => {
      if (park) {
        Parks.update(changes, id).then(updatedPark => {
          res.json({
            message: "You have successfully updated the park:",
            updatedPark
          });
        });
      } else {
        res.status(404).json({ message: "Could not find park with given id." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Failed to update park: " + err.message });
    });
});

router.get("/:id/ratings", (req, res) => {
  const { id } = req.params;
  Parks.getRatings(id)
    .then(park => {
      res.status(200).json(park);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching the park ratings: " + err.message
      });
    });
});

router.post("/:id/ratings", restricted, (req, res) => {
  const decodedToken = req.decodedToken;
  const user_id = decodedToken.subject;
  const { id } = req.params;
  let park_id = id;
  const { rating, comment } = req.body;
  const newRating = { rating, comment, park_id, user_id };
  Parks.addRating(newRating)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the rating: " + err.message
      });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;
  Parks.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find park with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete park" });
    });
});

module.exports = router;
