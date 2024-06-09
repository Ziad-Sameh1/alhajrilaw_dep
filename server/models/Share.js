const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    txt: {
      type: String,
    },
    filePath: {
      type: String,
    },
  },
  { timestamps: true }
);

const Share = mongoose.model("Share", ShareSchema);

module.exports = Share;
