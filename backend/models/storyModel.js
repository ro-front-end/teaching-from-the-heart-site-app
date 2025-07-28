const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    minlength: 3,
  },
  contentOne: {
    type: String,
  },
  contentTwo: {
    type: String,
  },

  imageOne: {
    type: String,
  },
  imageTwo: {
    type: String,
  },
  imageThree: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

storySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
