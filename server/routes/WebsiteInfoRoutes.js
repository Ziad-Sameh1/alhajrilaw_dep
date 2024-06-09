const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getInfo,
  updateStats,
} = require("../controllers/WebsiteInfoController");

const authMiddleware = require("../middleware/auth");

router.get("/", getInfo);
router.put("/update", authMiddleware.verifyAdminLogin, updateStats);

module.exports = router;
