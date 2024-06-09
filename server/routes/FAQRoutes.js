const express = require("express");

const router = express.Router({ mergeParams: true });
const FAQController = require("../controllers/FAQController");

const authMiddleware = require("../middleware/auth");

router.post("/add", FAQController.addFAQ);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  FAQController.getFAQsStats
);
router.get("/get-all", FAQController.getFAQs);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  FAQController.getFAQsByName
);
router.put("/update", authMiddleware.verifyAdminLogin, FAQController.updateFAQ);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  FAQController.deleteFAQ
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  FAQController.deleteAll
);

module.exports = router;
