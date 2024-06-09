const Job = require("../models/Job");

const addJob = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { labelEN, labelAR, value } = req.body;
    const created = await Job.create({
      labelEN: labelEN,
      labelAR: labelAR,
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

const getJobs = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Job.find({}).sort({ createdAt: "desc" });
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteAllJobs = async (req, res) => {
  try {
    await Job.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addJob,
  getJobs,
  deleteAllJobs,
};
