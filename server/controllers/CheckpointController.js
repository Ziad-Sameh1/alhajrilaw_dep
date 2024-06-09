const Checkpoint = require("../models/Checkpoint");
const User = require("../models/User");
const appRoute = require('app-root-path')
const handlebars = require('handlebars')
const fs = require('fs')
const nodemailer = require("nodemailer");
const smtptransport = require("nodemailer-smtp-transport");

const getCheckpointsStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Checkpoint.find({});
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
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const senderEmail = "ziad.s.a.m.e.h223@gmail.com"
const senderPass = "gdmfibihwymoiqxd"

const transporter = nodemailer.createTransport(
  smtptransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
  })
);

const addCheckpoint = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { email, lat, lng } = req.body;
    const created = await Checkpoint.create({
      email: email,
      lat: lat,
      lng: lng,
    });
    if (created) {
      const user = await User.findOne({ email: email });
      readHTMLFile(
        appRoute + "/views/send-location-template.html",
        function (err, html) {
          if (err) {
            console.log("cannot read file: " + err);
            res.json({
              message: "An error occurred",
            });
          } else {
            var template = handlebars.compile(html);
            var replacements = {
              employeeEmail: created.email,
              latitude: created.lat,
              longitude: created.lng,
            };
            var htmlToSend = template(replacements);
            var sentCnt = 0;
            for (var receiverIdx in user.receivers) {
              const receiver = user.receivers[receiverIdx];
              console.log(receiver)
              const mailInfo = {
                from: {
                  name: "Alhajri Law Firm",
                  address: senderEmail,
                },
                to: receiver,
                subject: `New Location Update(${receiver}) - ${new Date()}`,
                html: htmlToSend,
              };
              transporter.sendMail(mailInfo, function (err, data) {
                sentCnt++;
                console.log(mailInfo)
                if (sentCnt == user.receivers.length) {
                  return res.json(created);
                }
                // if (err) {
                //   console.log("cannot send email: " + err);
                //   res.json({
                //     message: "An error occurred",
                //   });
                // }
              });
            }
          }
        }
      );
    } else {
      res.status(500).json({ msg: "Error Occurred!" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const getCheckpoints = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Checkpoint.find({})
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);

    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const getCheckpointsByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Checkpoint.find({
      name: { $regex: req.query.name, $options: "i" },
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const getCheckpointsByUser = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { email, pageSize, pageNum } = req.query;
    const result = await Checkpoint.find({
      email: email,
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);
    if (result) {
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const updateCheckpoint = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Checkpoint.findOne({ _id: req.body._id });
    if (result) {
      result.email = req.body.email;
      result.lat = req.body.lat;
      result.lng = req.body.lng;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const deleteCheckpoint = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Checkpoint.deleteOne({ _id: req.query._id });
    if (result.deletedCount === 1)
      return res.status(200).json({ msg: "Deleted Successfully" });
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

const deleteAll = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    await Checkpoint.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.checkpoint });
    console.log(`Error: ${err.checkpoint}`);
  }
};

module.exports = {
  addCheckpoint,
  getCheckpoints,
  getCheckpointsByName,
  getCheckpointsByUser,
  getCheckpointsStats,
  updateCheckpoint,
  deleteCheckpoint,
  deleteAll,
};
