const express = require("express");
const cors = require("cors");
const { PORT, MONGODB } = require("./utils/config");
const mongoose = require("mongoose");
const storyRoutes = require("./controllers/storyRoutes");
const authRoutes = require("./controllers/authRoutes.js");

// connecting to express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

// connecting to the DB
mongoose.connect(MONGODB).then(() => {
  console.info("Connected to MONGODB");
});

app.listen(PORT, () => {
  console.info(`Server running on port: ${PORT}`);
});
