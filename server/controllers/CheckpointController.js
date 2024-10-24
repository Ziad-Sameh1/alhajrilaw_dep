const Checkpoint = require("../models/Checkpoint");
const User = require("../models/User");
const appRoute = require("app-root-path");
const handlebars = require("handlebars");
const fs = require("fs");
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

const senderEmail = "ziad.s.a.m.e.h223@gmail.com";
const senderPass = "gdmfibihwymoiqxd";

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
  try {
    const { email, checkin_lat, checkin_lng, checkout_lat, checkout_lng, placeName } = req.body; // Updated variable names
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let checkInStatus = user.checkInStatus;
    let checkInTime;
    let checkOutTime;
    let created;

    if (checkInStatus === "checked_out" || checkInStatus === "none") {
      checkInStatus = "checked_in";
      checkInTime = new Date();

      created = await Checkpoint.create({
        email: email,
        checkin_lat: checkin_lat, // Use updated property names
        checkin_lng: checkin_lng, // Use updated property names
        checkInTime: checkInTime,
        placeName: placeName, // Include placeName when checking in
      });
    } else if (checkInStatus === "checked_in") {
      checkInStatus = "checked_out";
      checkOutTime = new Date();

      // Find the last checkpoint for the user and update it
      created = await Checkpoint.findOneAndUpdate(
        { email: email },
        { $set: { checkout_lat: checkout_lat, checkout_lng: checkout_lng, checkOutTime: checkOutTime } }, // Update checkout fields
        { sort: { createdAt: -1 }, new: true }
      );
    }

    if (created) {
      user.checkInStatus = checkInStatus;
      await user.save();

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
              latitude: created.checkin_lat, // Update to reflect checkpoint's lat
              longitude: created.checkin_lng, // Update to reflect checkpoint's lng
              placeName: created.placeName, // Include placeName in the email template
            };
            var htmlToSend = template(replacements);
            var sentCnt = 0;
            for (var receiverIdx in user.receivers) {
              const receiver = user.receivers[receiverIdx];
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
                if (sentCnt === user.receivers.length) {
                  return res.json(created);
                }
              });
            }
          }
        }
      );
    } else {
      res.status(500).json({ msg: "Error Occurred!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
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

const getCheckpointsGrouped = async (req, res) => {
  try {
    const { pageSize = 10, pageNum = 0, startDate, endDate, email } = req.query;
    const limit = parseInt(pageSize);
    const skip = parseInt(pageSize) * parseInt(pageNum);

    // Set default values for startDate and endDate if not provided
    const start = startDate ? new Date(startDate) : new Date("1970-01-01");
    const end = endDate ? new Date(endDate) : new Date();

    // Ensure dates are in ISO format
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const matchStage = {
      $match: {
        createdAt: { $gte: start, $lte: end },
        ...(email && { email: { $regex: email, $options: 'i' } }), // Case-insensitive partial match
      },
    };

    const result = await Checkpoint.aggregate([
      matchStage,
      {
        $group: {
          _id: "$email",
          checkpoints: {
            // TODO: SHOW ALSO CHECKPOINT ID
            $push: {
              _id: "$_id",
              checkin_lat: "$checkin_lat",
              checkin_lng: "$checkin_lng",
              checkout_lat: "$checkout_lat",
              checkout_lng: "$checkout_lng",
              checkInTime: "$checkInTime",
              checkOutTime: "$checkOutTime",
              placeName: "$placeName",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $sort: { "checkpoints.createdAt": -1 },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const totalCount = result[0].totalCount[0]?.count || 0;

    if (result.length > 0) {
      res.status(200).json({ checkpoints: result[0].data, totalCount });
    } else {
      res.status(404).json({ msg: "No Documents Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
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

const getLatestCheckpointByUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    console.log(email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const latestCheckpoint = await Checkpoint.findOne({ email: email }).sort({
      createdAt: -1,
    });

    if (latestCheckpoint) {
      return res.status(200).json(latestCheckpoint);
    } else {
      return res.status(404).json({ msg: "No Checkpoints Found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

const getCheckpointsByUser = async (req, res) => {
  try {
    const { email, pageSize = 10, pageNum = 0, start, end } = req.query;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Build the date filter if start and end dates are provided
    let dateFilter = {};
    if (start || end) {
      dateFilter.updatedAt = {};
      if (start) {
        dateFilter.updatedAt.$gte = new Date(start);
      }
      if (end) {
        dateFilter.updatedAt.$lte = new Date(end);
      }
    }

    // Find the checkpoints for the user with the date filter
    const checkpoints = await Checkpoint.find({ email: email, ...dateFilter })
      .sort({ createdAt: "desc" })
      .limit(parseInt(pageSize))
      .skip(parseInt(pageSize) * parseInt(pageNum));

    if (checkpoints.length > 0) {
      return res.status(200).json({ user: user, checkpoints: checkpoints });
    } else {
      return res.status(404).json({ msg: "No Checkpoints Found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
const updateCheckpoint = async (req, res) => {
  /**
   * Updates a checkpoint by its ID.
   */
  try {
    const result = await Checkpoint.findOne({ _id: req.body._id });
    if (result) {
      result.email = req.body.email;
      result.checkin_lat = req.body.checkin_lat; // Updated to reflect new field name
      result.checkin_lng = req.body.checkin_lng; // Updated to reflect new field name
      result.checkout_lat = req.body.checkout_lat; // If needed
      result.checkout_lng = req.body.checkout_lng; // If needed
      await result.save();
      res.status(200).json(result);
    } else {
      res.status(404).json({ msg: "No Documents Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // Updated to use err.message for better error handling
    console.log(`Error: ${err.message}`);
  }
};

const deleteCheckpoint = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  console.log(req.params)
  try {
    const result = await Checkpoint.deleteOne({ _id: req.params.id });
    console.log("result")
    console.log(result)
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
  getLatestCheckpointByUser,
  getCheckpointsGrouped,
  deleteAll,
};
