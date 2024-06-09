const express = require("express");

const router = express.Router({ mergeParams: true });

const categoryController = require("../controllers/CategoryController");

const authMiddleware = require("../middleware/auth");

router.get("/", categoryController.getCategory);
router.post(
  "/add",
  authMiddleware.verifyAdminLogin,
  categoryController.addCategory
);

module.exports = router;
