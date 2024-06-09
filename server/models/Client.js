const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
  {
    imgLink: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
