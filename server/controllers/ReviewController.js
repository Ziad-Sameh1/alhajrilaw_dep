const Review = require("../models/Review");

const getLastReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ visibility: "public" })
      .sort({ createdAt: "desc" })
      .limit(10);
    if (reviews) {
      res.status(200).json(reviews);
    } else res.status(500);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getReviewsStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Review.find({});
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

const addReview = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { name, email, phoneNumber, reviewTxt, rating } = req.body;
    const created = await Review.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      reviewTxt: reviewTxt,
      rating: rating,
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

const getReviews = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Review.find({})
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

const getReviewsByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Review.find({
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

const updateReview = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Review.findOne({ _id: req.body._id });
    if (result) {
      result.visibility = req.body.visibility;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteReview = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Review.deleteOne({ _id: req.query._id });
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
    await Review.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addReview,
  getReviews,
  getReviewsByName,
  getReviewsStats,
  updateReview,
  deleteReview,
  deleteAll,
  getLastReviews,
};
