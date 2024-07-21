const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Checkpoint = require("../models/Checkpoint");

const login = async (req, res) => {
  try {
    const request = {
      email: req.body.email,
      password: req.body.password,
    };

    let user = await User.findOne({ email: request.email });
    let entity = "user";

    if (!user) {
      const admin = await Admin.findOne({ email: request.email });
      if (!admin) {
        return res.status(400).json({ msg: "User or Admin not found" });
      }
      user = admin;
      entity = "admin";
    }

    console.log(user);

    const isValidPass = await bcrypt.compare(request.password, user.password);
    if (!isValidPass) return res.status(400).json({ msg: "Wrong password" });
    console.log(`Logged Email: ${user.email}`);

    const token = jwt.sign(
      { email: user.email },
      entity === "user"
        ? process.env.USER_JWT_SECRET
        : process.env.ADMIN_JWT_SECRET,
      {
        expiresIn: "60m",
      }
    );
    return res
      .cookie("token", token, { httpOnly: true })
      .json({
        entity,
        _id: user.id,
        email: user.email,
        password: '',
        receivers: [],
        checkInStatus: user.checkInStatus,
        role: user.role,
        createdAt: user.createdAt,
      });
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
    console.log("User is Logged In");
    return res.status(200).json({ msg: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getUserStats = async (req, res) => {
  /**
   * Tested 29 Mar 2023
   */
  try {
    const allUsers = await User.find({});
    const now = new Date();
    let allCnt = 0;
    let monthCnt = 0;
    let dayCnt = 0;
    let monthlyData = Array(12).fill(0);
    if (allUsers) {
      allUsers.forEach((user) => {
        allCnt++;
        monthlyData[user.createdAt.getMonth()]++;
        if (
          user.createdAt.getFullYear() === now.getFullYear() &&
          user.createdAt.getMonth() === now.getMonth()
        )
          monthCnt++;
        if (
          user.createdAt.getFullYear() === now.getFullYear() &&
          user.createdAt.getMonth() === now.getMonth() &&
          user.createdAt.getDate() === now.getDate()
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

const addUser = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { email, password, receivers } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Validate receivers
    for (const receiverEmail of receivers) {
      const admin = await Admin.findOne({ email: receiverEmail });
      if (!admin) {
        return res.status(400).json({
          message: `Admin with email ${receiverEmail} does not exist`,
        });
      }
    }
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email: email,
      password: hashedPass,
      receivers: receivers,
    });
    if (newUser) {
      res.status(201).json({ msg: "Added Successfully" });
    } else {
      res.status(500).json({ msg: "Error Occurred!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const getUsersWithCheckpointsToday = async (req, res) => {
  try {
    console.log("getUsersWithCheckpointsToday");

    // Get today's start and end times
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Find checkpoints updated within today's range
    const checkpoints = await Checkpoint.find({
      updatedAt: { $gte: todayStart, $lte: todayEnd }
    }).select('email');

    // Get unique user emails from checkpoints
    const userEmails = [...new Set(checkpoints.map(checkpoint => checkpoint.email))];

    // Get the pagination details from query parameters
    const { pageSize = 10, pageNum = 0 } = req.query;

    // Find users with emails in the checkpoints found
    const users = await User.find({ email: { $in: userEmails } })
      .sort({ createdAt: "desc" })
      .limit(parseInt(pageSize))
      .skip(parseInt(pageSize) * parseInt(pageNum));

    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ msg: "No Users Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

  const getUsers = async (req, res) => {
    /**
     * Tested 28 Mar 2023
     */
    try {
      console.log("getUsers")
      const { pageSize, pageNum } = req.query;
      const users = await User.find({})
        .sort({ createdAt: "desc" })
        .limit(pageSize)
        .skip(pageSize * pageNum);

      if (users) {
        res.status(200).json(users);
      } else res.status(404).json({ msg: "No Users Found" });
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(`Error: ${err.message}`);
    }
  };

const getUserByEmailAddress = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const { pageSize, pageNum } = req.query;
    const user = await User.find({
      email: { $regex: req.query.email, $options: "i" },
    })
      .sort({ createdAt: "desc" })
      .limit(pageSize)
      .skip(pageSize * pageNum);
    if (user) {
      res.status(200).json(user);
    } else res.status(404).json({ msg: "No Users Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const updateUser = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user.receivers || user.email) {
      user.receivers = req.body.receivers;
      await user.save();
      res.status(200).json(user);
    } else if (user.email) {
      user.email = req.body.email;
      await user.save();
      res.status(200).json(user);
    } else res.status(404).json({ msg: "No Users Found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

const deleteUser = async (req, res) => {
  /**
   * Tested 28 Mar 2023
   */
  // try {
  //   const defaultUser = await User.findOne({ email: req.query.email });
  //   if (defaultUser.email === "user@alhajrilaw.com.qa") {
  //     return res.status(404).json({ msg: "Cannot Delete This User" });
  //   }
  // } catch (err) {
  //   return res.status(500).json({ error: err.message });
  // }
  try {
    const result = await User.deleteOne({ email: req.query.email });
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
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const isValidPass = await bcrypt.compare(currentPass, user.password);
    if (!isValidPass) return res.status(400).json({ msg: "Wrong password" });
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPass, salt);
    user.password = hashedPass;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(`Error: ${err.message}`);
  }
};

module.exports = {
  login,
  addUser,
  checkLoginStatus,
  getUserStats,
  getUsers,
  getUserByEmailAddress,
  updateUser,
  deleteUser,
  logout,
  getEmailFromToken,
  changePassword,
  getUsersWithCheckpointsToday
};
