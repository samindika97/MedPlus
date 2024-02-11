const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../models/user.model");
require("../auth/passportHandler");

const SECRET_KEY = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
  User.create({
    userName: req.body.userName.toLowerCase(),
    email: req.body.email,
    password: req.body.password,
  })
    .then((results) =>
      res.status(200).json({ message: "Successsfully Registered" })
    )
    .catch((error) => {
      if (error.code == 11000) {
        res
          .status(500)
          .json({ error: "User already exists for the above email" });
      } else {
        res.status(500).json({ error: "Error registering user. Try again" });
      }
    });
};

exports.authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: "error", code: "unauthorized" });
    } else {
      const token = jwt.sign({userId: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
      });
      res
        .status(200)
        .send({ token: token, username: user.userName, role: user.role });
    }
  })(req, res, next);
};
