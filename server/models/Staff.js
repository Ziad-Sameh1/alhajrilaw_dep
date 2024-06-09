const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
  },
}, {timestamps: true});

const Staff = mongoose.model("Employee", EmployeeSchema);

module.exports = Staff;
