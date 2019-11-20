// const express = require("express");
// const bcrypt = require("bcryptjs");
// const Users = require("./user-model");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// router.post("/login", validateLogin, (req, res) => {
//     let { username, password } = req.body;
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           const token = generateToken(user);
//           res.status(200).json({
//             message: `Welcome ${user.username}!`,
//             token: token
//           });
//         } else {
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error.message);
//       });
//   });

