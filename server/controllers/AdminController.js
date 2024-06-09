const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const request = {
      email: req.body.email,
      password: req.body.password,
    };
    const admin = await Admin.findOne({ email: request.email });
    console.log(admin);
    if (!admin) return res.status(400).json({ msg: "Admin not found" });
    const isValidPass = await bcrypt.compare(request.password, admin.password);
    if (!isValidPass) return res.status(400).json({ msg: "Wrong password" });
    console.log(`Logged Email: ${admin.email}`);
    const token = jwt.sign({ email: admin.email }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "60m",
    });
    return res.cookie("token", token, { httpOnly: true }).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const checkLoginStatus = async (req, res) => {
  try {
    console.log("Admin is Logged In");
    return res.status(200).json({ msg: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getAdminStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const allAdmins = await Admin.find({});
    const now = new Date();
    let allCnt = 0;
    let monthCnt = 0;
    let dayCnt = 0;
    let monthlyData = Array(12).fill(0);
    if (allAdmins) {
      allAdmins.forEach((admin) => {
        allCnt++;
        monthlyData[admin.createdAt.getMonth()]++;
        if (
          admin.createdAt.getFullYear() === now.getFullYear() &&
          admin.createdAt.getMonth() === now.getMonth()
        )
          monthCnt++;
        if (
          admin.createdAt.getFullYear() === now.getFullYear() &&
          admin.createdAt.getMonth() === now.getMonth() &&
          admin.createdAt.getDate() === now.getDate()
        )
          dayCnt++;
      });
    }
    console.log(monthlyData);
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

const addAdmin = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { email, password, role } = req.body;
    console.log(password);
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const newAdmin = await Admin.create({
      email: email,
      password: hashedPass,
      role: role,
    });
    if (newAdmin) {
      res.status(201).json({ msg: "Added Successfully" });
    } else {
      res.status(500).json({ msg: "Error Occurred!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getAdmins = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const admins = await Admin.find({})
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);

    if (admins) {
      res.status(200).json(admins);
    } else res.status(404).json({ msg: "No Admins Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getAdminByEmailAddress = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const admin = await Admin.find({
      email: { $regex: req.query.email, $options: "i" },
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);
    if (admin) {
      res.status(200).json(admin);
    } else res.status(404).json({ msg: "No Admins Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const updateAdmin = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const admin = await Admin.findOne({ _id: req.body._id });
    if (admin) {
      admin.role = req.body.role;
      await admin.save();
      res.status(200).json(admin);
    } else res.status(404).json({ msg: "No Admins Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteAdmin = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const defaultAdmin = await Admin.findOne({ _id: req.query._id });
    if (defaultAdmin.email === "admin@alhajrilaw.com.qa") {
      return res.status(404).json({ msg: "Cannot Delete This Admin" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
  try {
    const result = await Admin.deleteOne({ _id: req.query._id });
    if (result.deletedCount === 1)
      return res.status(200).json({ msg: "Deleted Successfully" });
    return res.status(404).json({ msg: "Not Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getEmailFromToken = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPass, newPass } = req.body;
    const { email } = req.user;
    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(404).json({ msg: "Admin not found" });
    const isValidPass = await bcrypt.compare(currentPass, admin.password);
    if (!isValidPass) return res.status(400).json({ msg: "Wrong password" });
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPass, salt);
    admin.password = hashedPass;
    await admin.save();
    return res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  login,
  addAdmin,
  checkLoginStatus,
  getAdminStats,
  getAdmins,
  getAdminByEmailAddress,
  updateAdmin,
  deleteAdmin,
  logout,
  getEmailFromToken,
  changePassword,
};
