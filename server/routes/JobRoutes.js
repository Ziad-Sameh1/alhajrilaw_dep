const express = require("express");

const router = express.Router({ mergeParams: true });

const jobController = require("../controllers/JobController");

const authMiddleware = require("../middleware/auth");

router.get("/", jobController.getJobs);
router.post("/add", authMiddleware.verifyAdminLogin, jobController.addJob);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  jobController.deleteAllJobs
);

module.exports = router;
