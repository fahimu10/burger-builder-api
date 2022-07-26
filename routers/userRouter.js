const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const _ = require("lodash");

const router = express.Router();

const newUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateToken();

  return res.status(200).send({ token: token, user: _.pick(user, ["email"]) });
};

const authUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password");
  }
  const validUser = await bcrypt.compare(req.body.password, user.password);
  if (!validUser) {
    return res.status(400).send("Invalid email or password");
  }
  const token = user.generateToken();
  return res.status(200).send({ token: token, user: _.pick(user, ["email"]) });
};

router.route("/").post(newUser);

router.route("/auth").post(authUser);

module.exports = router;
