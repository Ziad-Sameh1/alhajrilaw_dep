const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    reviewTxt: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
      default: "private",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
