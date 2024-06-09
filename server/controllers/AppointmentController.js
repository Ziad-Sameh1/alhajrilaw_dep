const Appointment = require("../models/Appointment.js");

const getAppointmentsStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const all = await Appointment.find({});
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

const addAppointment = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { name, email, phoneNumber, messageTxt } = req.body;
    const created = await Appointment.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      messageTxt: messageTxt,
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

const getAppointments = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Appointment.find({})
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

const getAppointmentsByName = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const result = await Appointment.find({
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

const updateAppointment = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Appointment.findOne({ _id: req.body._id });
    if (result) {
      result.name = req.body.name;
      result.email = req.body.email;
      result.phoneNumber = req.body.phoneNumber;
      result.messageTxt = req.body.messageTxt;
      await result.save();
      res.status(200).json(result);
    } else res.status(404).json({ msg: "No Documents Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteAppointment = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const result = await Appointment.deleteOne({ _id: req.query._id });
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
    await Appointment.deleteMany({});
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  getAppointmentsByName,
  getAppointmentsStats,
  updateAppointment,
  deleteAppointment,
  deleteAll,
};
