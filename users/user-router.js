const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./user-model");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 11);
  const newUser = {
    username,
    name,
    email,
    password: hash
  };

  Users.add(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error adding the user: " + error.message
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/list", (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "bad token " + err.message });
      } else {
        req.decodedToken = decodedToken;
        Users.find()
          .then(users => res.status(200).json(users))
          .catch(err =>
            res.status(500).json({
              message: err.message
            })
          );
      }
    });
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
});

router.get("/list/demo", (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(500).json({
        message: err.message
      })
    );
});

router.get("/:id", (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "bad token " + err.message });
      } else {
        req.decodedToken = decodedToken;
        Users.findBy({ id })
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            res.status(500).json({
              message: "Failed to get user: " + err.message
            });
          });
      }
    });
  }
});

router.get("/:id/demo", (req, res) => {
  const { id } = req.params;
  Users.findBy({ id })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get user: " + err.message
      });
    });
});

router.get("/:id/demo/ratings", (req, res) => {
  const { id } = req.params;
  Users.getRatings(id)
    .then(ratings => {
      res.status(200).json(ratings);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to get ratings: " + err.message
      });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(payload, process.env.SECRET_KEY, options);

  return result;
}

module.exports = router;
