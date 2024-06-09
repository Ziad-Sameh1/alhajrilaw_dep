const WebsiteInfo = require("../models/WebsiteInfo");

const getInfo = async (req, res) => {
  try {
    const result = await WebsiteInfo.findOne({});
    if (result) {
      res.status(200).json(result);
      return;
    }
    res.status(400).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};
const updateStats = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await WebsiteInfo.findOne({});
    if (result) {
      result.casesNum = req.body.casesNum;
      result.clientsNum = req.body.clientsNum;
      result.studentsNum = req.body.studentsNum;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  getInfo,
  updateStats,
};
