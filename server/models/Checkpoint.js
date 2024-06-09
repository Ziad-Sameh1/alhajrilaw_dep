const mongoose = require("mongoose");

const CheckpointSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = Checkpoint;
