const bcrypt = require("bcryptjs");
const generateToken = require("../utils");
const expressAsyncHandler = require("express-async-handler");

const express = require("express");

const User = require("../models/User");
const router = express.Router();

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const result = await User.findOne({
      email: req.body.email,
    });
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        res.send({
          _id: result._id,
          name: result.name,
          email: result.email,
          password: result.password,
          token: generateToken(result),
        });
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newuser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  })
);

module.exports = router;
