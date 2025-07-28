const storyRoutes = require("express").Router();
const Story = require("../models/storyModel");
const {
  tokenExtractor,
  userExtractor,
} = require("../utils/middleware/middleware");

// get all stories
storyRoutes.get("/", async (req, res) => {
  try {
    const stories = await Story.find({}).populate("user", { userName: 1 });

    return res.json(stories);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

storyRoutes.get("/:id", tokenExtractor, userExtractor, async (req, res) => {
  try {
    const user = req.user;

    const storyById = await Story.findById(req.params.id).populate("user", {
      userName: 1,
    });
    if (!storyById) return res.status(404).json({ error: "story not found" });

    if (storyById.user?.toString() !== user.id) {
      return res
        .status(403)
        .json({ error: "you don't have permission to get the story" });
    }

    return res.json(storyById);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "server error", message: error.message });
  }
});

// create stories
storyRoutes.post("/", tokenExtractor, userExtractor, async (req, res) => {
  try {
    const user = req.user;

    const { title, contentOne, contentTwo, imageOne, imageTwo, imageThree } =
      req.body;

    const existingStory = await Story.findOne({ title });
    if (existingStory) {
      return res.status(409).json({ error: "title already exists" });
    }

    const requiredFields = [
      title,
      contentOne,
      contentTwo,
      imageOne,
      imageTwo,
      imageThree,
    ];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "the required data is missing" });
    }

    const newStory = new Story({
      title,
      contentOne,
      contentTwo,
      imageOne,
      imageTwo,
      imageThree,
      user: user._id,
    });

    const savedStory = await newStory.save();

    user.stories = user.stories.concat(savedStory._id);
    await user.save();

    res.status(201).json(savedStory);
  } catch (error) {
    return res.status(500).json({
      error: "server error couldn't create Story",
      message: error.message,
    });
  }
});

storyRoutes.delete("/:id", tokenExtractor, userExtractor, async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: "story not found" });
    }

    if (story.user.toString() !== user.id) {
      return res
        .status(403)
        .json({ error: "you don't have permission to delete this story" });
    }

    await Story.findByIdAndDelete(id);

    res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      error: "server error couldn't delete story",
      message: error.message,
    });
  }
});

storyRoutes.put("/:id", tokenExtractor, userExtractor, async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    const { title, contentOne, contentTwo, imageOne, imageTwo, imageThree } =
      req.body;

    const requiredFields = [
      title,
      contentOne,
      contentTwo,
      imageOne,
      imageTwo,
      imageThree,
    ];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "the required data is missing" });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: "story not found" });
    }

    if (story.user.toString() !== user.id) {
      return res
        .status(403)
        .json({ error: "you don't have permission to edit this story" });
    }

    const editedStory = await Story.findByIdAndUpdate(
      story._id,
      {
        title,
        contentOne,
        contentTwo,
        imageOne,
        imageTwo,
        imageThree,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(editedStory);
  } catch (error) {
    return res.status(500).json({
      error: "server error couldn't edit story",
      message: error.message,
    });
  }
});

module.exports = storyRoutes;
