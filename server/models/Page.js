const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    video: {
      type: String,
    },
    link: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
