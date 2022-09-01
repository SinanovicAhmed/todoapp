const express = require("express");
const { findOne } = require("../models/userModel");
const router = require("express").Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.json({ msg: "Missing one of the fields" });
  }
  const checkUsername = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });

  if (checkUsername || checkEmail) {
    res.json({ msg: "User exists" });
  }
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Missing username or password" });
  }

  const user = await User.findOne({ username });

  if (user && password === user.password) {
    res.json({ status: "succesfull", id: user._id, username: user.username });
  } else {
    res.json({ status: "unsuccesfull" });
  }
});

module.exports = router;
