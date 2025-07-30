const express = require("express");
const cors = require("cors");
const { PORT, MONGODB } = require("./utils/config");
const mongoose = require("mongoose");
const storyRoutes = require("./controllers/storyRoutes");
const authRoutes = require("./controllers/authRoutes.js");

// connecting to express
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://teaching-from-the-heart.vercel.app",
      "https://teaching-from-the-heart-app.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
