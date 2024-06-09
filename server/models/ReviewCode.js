const mongoose = require("mongoose");

const ReviewCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "valid",
    },
  },
  { timestamps: true }
);

const ReviewCode = mongoose.model("ReviewCode", ReviewCodeSchema);

module.exports = ReviewCode;
