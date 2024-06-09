const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: String,
      unique: true,
    },
    labelEN: {
      type: String,
      required: String,
    },
    labelAR: {
      type: String,
      required: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
