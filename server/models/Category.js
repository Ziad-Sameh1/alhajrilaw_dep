const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: String,
    },
    label: {
      type: String,
      required: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
