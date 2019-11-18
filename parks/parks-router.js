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
    Parks.add
})


module.exports = router;