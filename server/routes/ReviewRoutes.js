const express = require("express");

const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/ReviewController");
const { verifyAccessLogin } = require("../middleware/auth");

const authMiddleware = require("../middleware/auth");

router.post("/add", verifyAccessLogin, reviewController.addReview);
router.get("/last", reviewController.getLastReviews);
router.post(
  "/admin/add",
  authMiddleware.verifyAdminLogin,
  reviewController.addReview
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  reviewController.getReviewsStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  reviewController.getReviews
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  reviewController.getReviewsByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  reviewController.updateReview
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  reviewController.deleteReview
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  reviewController.deleteAll
);
module.exports = router;
