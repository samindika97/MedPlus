const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../models/user.model");
require("../auth/passportHandler");

const SECRET_KEY = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
  console.log(req.body);

  await User.create({
    userName: req.body.userName.toLowerCase(),
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign({ email: req.body.email }, SECRET_KEY, {
    expiresIn: "24h",
  });
  res.status(200).send({ token: token, username: req.body.userName });
};

exports.authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      const token = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
      });
      res.status(200).send({ token: token, username: user.userName });
    }
  })(req, res, next);
};
