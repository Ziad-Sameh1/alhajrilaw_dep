const Page = require("../models/Page");
const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const getPage = async (req, res) => {
  try {
    const request = {
      link: req.query.link,
    };
    const url = `${process.env.CLIENT_LINK}/page/${request.link}`;
    console.log(url);
    const page = await Page.findOne({ link: url });
    console.log("found");
    console.log(page);
    if (page) {
      res.status(200).json(page);
    } else res.status(500);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getLastPages = async (req, res) => {
  try {
    const request = {
      pageSize: req.query.pageSize,
      pageNum: req.query.pageNum,
    };
    const pages = await Page.find({})
      .sort({ createdAt: "desc" })
      .limit(request.pageSize)
      .skip(request.pageSize * (request.pageNum - 1));
    if (pages) {
      res.status(200).json(pages);
    } else res.status(500);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getPagesStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Page.find({});
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

const addPage = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let imageURL = "";
  let videoURL = "";
  const random = Math.floor(Math.random() * 10000000000000);
  const link = `${process.env.CLIENT_LINK}/page/${random}`;
  try {
    const file1 = req.files.thumbnail[0];
    const splits1 = file1.originalname.split(".");
    const fileExt1 = splits1[splits1.length - 1];
    imageURL = `api/uploads/images/thumbnails/${req.query.unique1}.${fileExt1}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  try {
    const file2 = req.files.video[0];
    const splits2 = file2.originalname.split(".");
    const fileExt2 = splits2[splits2.length - 1];
    videoURL = `api/uploads/videos/pages/${req.query.unique2}.${fileExt2}`;
    console.log(videoURL);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  try {
    console.log(req.body);
    const { title, content, category } = req.body;
    const created = await Page.create({
      title: title,
      content: content,
      thumbnail: imageURL,
      video: videoURL,
      link: link,
      category: category,
    });
    console.log(created);
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

const getPages = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Page.find({})
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

const getPagesByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Page.find({
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

const getPagesByCategory = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    console.log("inside");
    console.log(req.query);
    const { pageSize, pageNum, category } = req.query;
    let result = [];
    if (category === "a-l-l") {
      console.log("should fetch all");
      result = await Page.find({})
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * pageNum);
    } else {
      console.log("should fetch some");
      result = await Page.find({
        category: req.query.category,
      })
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * pageNum);
    }
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const updatePage = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   *       _id: "",
      title: "",
      content: "",
      thumbnailLink: "",
      videoLink: "",
      category: "",
      video: {},
      thumbnail: {},
   */
  console.log("update bodyyyyyyyyyyyyyy");
  console.log(req.body);
  let newImageURL = "";
  let newVideoURL = "";
  try {
    const file1 = req.files.thumbnail[0];
    const splits1 = file1.originalname.split(".");
    const fileExt1 = splits1[splits1.length - 1];
    newImageURL = `api/uploads/images/thumbnails/${req.query.unique1}.${fileExt1}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    newImageURL = "";
  }
  try {
    const file2 = req.files.video[0];
    const splits2 = file2.originalname.split(".");
    const fileExt2 = splits2[splits2.length - 1];
    newVideoURL = `api/uploads/videos/pages/${req.query.unique2}.${fileExt2}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    newVideoURL = "";
  }
  try {
    const result = await Page.findOne({ _id: req.body._id });
    if (result) {
      result.title = req.body.title;
      result.content = req.body.content;
      result.category = req.body.category;
      if (newImageURL !== "") result.thumbnail = newImageURL;
      if (newVideoURL !== "") result.video = newVideoURL;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deletePage = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const doc = await Page.findOne({ _id: req.query._id });
    if (doc && doc.thumbnail !== undefined && doc.thumbnail !== "") {
      const id = doc.thumbnail.substring(29);
      fs.unlink(`${appDir}/uploads/pages${id}`, (err) => {
        if (err) console.log(err);
        else console.log("file deleted");
      });
    }
    if (doc && doc.video !== undefined && doc.video !== "") {
      const id = doc.video.substring(24);
      fs.unlink(`${appDir}/uploads/pages${id}`, (err) => {
        if (err) console.log(err);
        else console.log("file deleted");
      });
    }
    const result = await Page.deleteOne({ _id: req.query._id });
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
    const all = await Page.find({});
    if (all) {
      all.forEach((item) => {
        if (item.thumbnail !== "") {
          const id = item.thumbnail.substring(29);
          fs.unlink(`${appDir}/uploads/pages${id}`, (err) => {
            if (err) console.log(err);
            else console.log("file deleted");
          });
        }
        if (item.video !== "") {
          const id = item.video.substring(24);
          fs.unlink(`${appDir}/uploads/pages${id}`, (err) => {
            if (err) console.log(err);
            else console.log("file deleted");
          });
        }
      });
    }
    await Page.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addPage,
  getPages,
  getPagesByName,
  getPagesStats,
  updatePage,
  deletePage,
  deleteAll,
  getPage,
  getLastPages,
  getPagesByCategory,
};
