const ReviewCode = require("../models/ReviewCode.js");
const jwt = require("jsonwebtoken");

const getReviewCodesStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await ReviewCode.find({});
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

const addReviewCode = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { code, status } = req.body;
    const created = await ReviewCode.create({
      code: code,
      status: status,
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

const getReviewCodes = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await ReviewCode.find({})
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

const getReviewCodesByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await ReviewCode.find({
      code: { $regex: req.query.name, $options: "i" },
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

const updateReviewCode = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await ReviewCode.findOne({ _id: req.body._id });
    if (result) {
      result.status = req.body.status;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteReviewCode = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await ReviewCode.deleteOne({ _id: req.query._id });
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
    await ReviewCode.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const useCode = async (req, res) => {
  try {
    const request = {
      code: req.body.code,
    };
    const code = await ReviewCode.findOne({ code: request.code });
    console.log(code);
    const isValid = code.status === "valid";
    if (isValid) {
      const token = jwt.sign({ id: code._id }, process.env.JWT_SECRET, {
        expiresIn: 30 * 60, // 30mins
      });
      const updatedCode = await ReviewCode.findByIdAndUpdate(
        code._id,
        {
          status: "not-valid",
        },
        { new: true }
      );
      res.status(200).json({ token, updatedCode });
    } else {
      res.status(500).json({ msg: "Code is Not Valid Anymore!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const renewCode = async (req, res) => {
  try {
    const request = {
      code: req.body.code,
    };
    const code = await ReviewCode.findOne({ code: request.code });
    const updatedCode = await ReviewCode.findByIdAndUpdate(
      code._id,
      {
        status: "valid",
      },
      { new: true }
    );
    res.status(200).json(updatedCode);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addReviewCode,
  getReviewCodes,
  getReviewCodesByName,
  getReviewCodesStats,
  updateReviewCode,
  deleteReviewCode,
  deleteAll,
  useCode,
  renewCode,
};
