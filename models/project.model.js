const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  features: [
    {
      type: String,
      required: true,
    },
  ],
  myRole: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
