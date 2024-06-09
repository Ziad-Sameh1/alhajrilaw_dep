const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: String,
      unique: true,
    },
    password: {
      type: String,
      required: String,
    },
    role: {
      type: Number,
      default: 99,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
