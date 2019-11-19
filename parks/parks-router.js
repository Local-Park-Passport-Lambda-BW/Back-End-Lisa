const express = require("express");
const Parks = require("./parks-model");
const router = express.Router();

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
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching the park details: " + err.message
      });
    });
});

// router.post("/:id/facilities", (req, res) => {
//     const {name, description} = req.body;
//     const newFacility = {
//         name,
//         description
//     }
// })

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Parks.findById(id)
    .then(park => {
      res.status(200).json(park);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error fetching the park: " + err.message
      });
    });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
