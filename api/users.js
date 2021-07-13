const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginData = require("../validation/login");
const validateRegistrationData = require("../validation/register");
const User = require("../models/user");
const passport = require("passport");
const { jwtVerify } = require("../validation/jwtServices");

router.post("/registration", (req, res) => {
  const domain = req.protocol + ":/" + req.get("host");
  req.body.domain = domain;
  const { errors, isValid } = validateRegistrationData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(200).json({ message: "Email already exists" });
    } else {
      const registerUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(registerUser.password, salt, (err, hash) => {
          if (err) throw err;
          registerUser.password = hash;
          registerUser
            .save()
            .then((user) => {
              res.json({
                message: "User created successfully",
                user,
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginData(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user with that email not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
        };
        jwt.sign(
          payload,
          "secrets",
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "incorrect password" });
      }
    });
  });
});

router.get(
  "/all",
//   passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    User.find(function (err, user) {
      if (err) {
        var err = new Error("error occured");
        return next(err);
      }
      res
        .status(200)
        .json({ message: "All users retrived successfully", user });
    });
  }
);

module.exports = router;
