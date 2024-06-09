const Staff = require("../models/Staff");
const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const getStaffStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Staff.find({});
    const now = new Date();
    let allCnt = 0;
    let monthCnt = 0;
    let dayCnt = 0;
    let monthlyData = Array(12).fill(0);
    if (all) {
      all.forEach((item) => {
        allCnt++;
        monthlyData[item.createdAt.getMonth()]++;
        if (
          item.createdAt.getFullYear() === now.getFullYear() &&
          item.createdAt.getMonth() === now.getMonth()
        )
          monthCnt++;
        if (
          item.createdAt.getFullYear() === now.getFullYear() &&
          item.createdAt.getMonth() === now.getMonth() &&
          item.createdAt.getDate() === now.getDate()
        )
          dayCnt++;
      });
    }
    return res.status(200).json({
      all: allCnt,
      month: monthCnt,
      day: dayCnt,
      monthly: monthlyData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const addStaff = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  try {
    const file = req.file;
    url = `api/uploads/images/staff/${req.query.unique}${file.originalname}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  try {
    const { name, position } = req.body;
    const created = await Staff.create({
      name: name,
      position: position,
      imgLink: url,
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

const getStaff = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Staff.find({})
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);

    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getEmployeeByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Staff.find({
      name: { $regex: req.query.name, $options: "i" },
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const updateEmployee = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  let imageUploaded = true;
  try {
    const file = req.file;
    url = `api/uploads/images/staff/${req.query.unique}${file.originalname}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    imageUploaded = false;
  }
  try {
    const result = await Staff.findOne({ _id: req.body._id });
    if (result) {
      result.name = req.body.name;
      result.position = req.body.position;
      console.log(`image uploaded? ${imageUploaded}`);
      if (imageUploaded) {
        console.log(`url => ${url}`);
        result.imgLink = url;
      }
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteEmployee = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const doc = await Staff.findOne({ _id: req.query._id });
    if (doc && doc.imgLink !== undefined && doc.imgLink !== "") {
      const id = doc.imgLink.substring(25);
      fs.unlink(`${appDir}/uploads/images/staff/${id}`, (err) => {
        if (err) console.log(err);
        else console.log("file deleted");
      });
    }
    const result = await Staff.deleteOne({ _id: req.query._id });
    if (result.deletedCount === 1)
      return res.status(200).json({ msg: "Deleted Successfully" });
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteAll = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const all = await Staff.find({});
    if (all) {
      all.forEach((item) => {
        if (item.imgLink !== "") {
          const id = item.imgLink.substring(25);
          fs.unlink(`${appDir}/uploads/images/staff/${id}`, (err) => {
            if (err) console.log(err);
            else console.log("file deleted");
          });
        }
      });
    }
    await Staff.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addStaff,
  getStaff,
  getEmployeeByName,
  getStaffStats,
  updateEmployee,
  deleteEmployee,
  deleteAll,
};
