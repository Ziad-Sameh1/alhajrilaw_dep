const mongoose = require("mongoose");

const CheckpointSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for unique identifier
      required: true,
      auto: true, // Automatically create and assign an ObjectId
    },
    email: {
      type: String,
      required: true,
    },
    checkin_lat: {
      type: String,
      required: true,
    },
    checkin_lng: {
      type: String,
      required: true,
    },
    checkout_lat: {
      type: String,
    },
    checkout_lng: {
      type: String,
    },
    checkInTime: {
      type: Date,
    },
    checkOutTime: {
      type: Date,
    },
    placeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Checkpoint = mongoose.model("Checkpoint", CheckpointSchema);

module.exports = Checkpoint;
