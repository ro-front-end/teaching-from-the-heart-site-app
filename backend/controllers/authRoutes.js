const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { SECRET_AUTH, MASTER_KEY } = require("../utils/config");

const authRoutes = require("express").Router();

authRoutes.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "invalid or missing data" });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ error: "invalid password", message: error.message });
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET_AUTH, { expiresIn: "1h" });

    res.status(200).json({
      token,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

authRoutes.post("/signin", async (req, res) => {
  try {
    const { username, email, password, masterKey } = req.body;

    const requiredFields = [username, email, password, masterKey];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "missing data or invalid data" });
    }

    if (masterKey !== MASTER_KEY) {
      return res.status(401).json({ error: "invalid master key" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "user name or email already exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    const userForToken = {
      id: savedUser._id,
      username: savedUser.username,
    };

    const token = jwt.sign(userForToken, SECRET_AUTH, { expiresIn: "1h" });

    res.status(201).json({
      token,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ error: "server error", message: error.message });
  }
});

module.exports = authRoutes;
