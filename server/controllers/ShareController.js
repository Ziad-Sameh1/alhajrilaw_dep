const Share = require("../models/Share");
const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const getSharesStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    console.log("statss");
    const all = await Share.find({});
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

const addShare = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  let link = "";
  try {
    const file = req.file;
    const splits = file.originalname.split(".");
    const fileExt = splits[splits.length - 1];
    url = `api/uploads/pdfs/shares/${req.query.unique}.${fileExt}`;
    link = `${process.env.SERVER_LINK}/api/shares/${req.query.unique}.${fileExt}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  try {
    const { label, txt } = req.body;
    if (link === "")
      link = `${process.env.CLIENT_LINK}/dashboard/shares/${req.query.unique}`;
    const created = await Share.create({
      txt: txt,
      filePath: url,
      link: link,
      label: label,
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

const getShares = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Share.find({})
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

const getSharesByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Share.find({
      label: { $regex: req.query.name, $options: "i" },
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

const getShareByLink = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const link = `${process.env.CLIENT_LINK}/dashboard/shares/${req.query.link}`;
    console.log(link);
    const result = await Share.findOne({
      link: link,
    });
    console.log(result);
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const updateShare = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  let imageUploaded = true;
  try {
    const file = req.file;
    url = `api/uploads/pdfs/shares/${req.query.unique}${file.originalname}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    imageUploaded = false;
  }
  try {
    const result = await Share.findOne({ _id: req.body._id });
    if (result) {
      result.txt = req.body.txt;
      if (imageUploaded) {
        result.filePath = url;
      }
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteShare = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const doc = await Share.findOne({ _id: req.query._id });
    if (doc && doc.filePath !== undefined && doc.filePath !== "") {
      const id = doc.filePath.substring(23);
      fs.unlink(`${appDir}/uploads/pdfs/shares/${id}`, (err) => {
        if (err) console.log(err);
        else console.log("file deleted");
      });
    }
    const result = await Share.deleteOne({ _id: req.query._id });
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
    const all = await Share.find({});
    if (all) {
      all.forEach((item) => {
        if (item.filePath !== "") {
          const id = item.filePath.substring(23);
          fs.unlink(`${appDir}/uploads/pdfs/shares/${id}`, (err) => {
            if (err) console.log(err);
            else console.log("file deleted");
          });
        }
      });
    }
    await Share.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addShare,
  getShares,
  getSharesByName,
  getSharesStats,
  getShareByLink,
  updateShare,
  deleteShare,
  deleteAll,
};
