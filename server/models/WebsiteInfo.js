const mongoose = require("mongoose");

const WebsiteInfoSchema = new mongoose.Schema({
  clientsNum: {
    type: String,
  },
  casesNum: {
    type: String,
  },
  studentsNum: {
    type: String
  }
});

const WebsiteInfo = mongoose.model("WebsiteInfo", WebsiteInfoSchema);

module.exports = WebsiteInfo;
