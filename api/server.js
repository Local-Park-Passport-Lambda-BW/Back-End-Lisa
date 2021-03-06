const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Users = require("../users/user-model");

const parksRouter = require("../parks/parks-router");
const userRouter = require("../users/user-router.js");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/parks", parksRouter);
server.use("/users", userRouter);
server.use("/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the Parks Passport API!");
});

module.exports = server;
