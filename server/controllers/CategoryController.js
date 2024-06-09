const Category = require("../models/Category");

const addCategory = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { label, value } = req.body;
    const created = await Category.create({
      label: label,
      value: value,
    });
    if (created) {
      res.status(201).json({ msg: "Added Successfully" });
    } else {
      res.status(500).json({ msg: "Error Occurred!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getCategory = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Category.find({}).sort({ createdAt: "desc" });
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addCategory,
  getCategory,
};
