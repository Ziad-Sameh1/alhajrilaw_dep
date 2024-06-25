const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    receivers: [{ type: String, ref: 'Admin' }],
    checkInStatus: {
      type: String,
      enum: ['checked_in', 'checked_out', 'none'],
      default: 'none',
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
