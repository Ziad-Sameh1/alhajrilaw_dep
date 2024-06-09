const Client = require("../models/Client");
const fs = require("fs");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const getTopClients = async (req, res) => {
  try {
    const clients = await Client.find({}).sort({ order: "asc" }).limit(10);
    if (clients) {
      res.status(200).json(clients);
    } else {
      res.status(400).json({ msg: "No Clients Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getClientsStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Client.find({});
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

const addClient = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  try {
    const file = req.file;
    url = `api/uploads/images/clients/${req.query.unique}${file.originalname}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  try {
    const { name, order } = req.body;
    const created = await Client.create({
      name: name,
      order: order,
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

const getClients = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Client.find({})
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

const getClientsByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Client.find({
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

const updateClient = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  let url = "";
  let imageUploaded = true;
  try {
    const file = req.file;
    url = `api/uploads/images/clients/${req.query.unique}${file.originalname}`;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    imageUploaded = false;
  }
  try {
    const result = await Client.findOne({ _id: req.body._id });
    if (result) {
      result.name = req.body.name;
      result.order = req.body.order;
      if (imageUploaded) {
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

const deleteClient = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const doc = await Client.findOne({ _id: req.query._id });
    if (doc && doc.imgLink !== undefined && doc.imgLink !== "") {
      const id = doc.imgLink.substring(26);
      fs.unlink(`${appDir}/uploads/images/clients${id}`, (err) => {
        if (err) console.log(err);
        else console.log("file deleted");
      });
    }
    const result = await Client.deleteOne({ _id: req.query._id });
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
    const all = await Client.find({});
    if (all) {
      console.log(all);
      all.forEach((item) => {
        if (item.imgLink !== "") {
          const id = item.imgLink.substring(26);
          fs.unlink(`${appDir}/uploads/images/clients${id}`, (err) => {
            if (err) console.log(err);
            else console.log("file deleted");
          });
        }
      });
    }
    await Client.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addClient,
  getTopClients,
  getClients,
  getClientsByName,
  getClientsStats,
  updateClient,
  deleteClient,
  deleteAll,
};
