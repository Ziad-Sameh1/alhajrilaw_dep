const express = require("express");

const router = express.Router({ mergeParams: true });

const reviewCodesController = require("../controllers/ReviewCodesController");

const authMiddleware = require("../middleware/auth");

router.put("/use", reviewCodesController.useCode);
router.post(
  "/add",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.addReviewCode
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.getReviewCodesStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.getReviewCodes
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.getReviewCodesByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.updateReviewCode
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.deleteReviewCode
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  reviewCodesController.deleteAll
);
module.exports = router;
