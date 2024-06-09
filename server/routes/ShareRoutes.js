const express = require("express");

const router = express.Router({ mergeParams: true });

const shareController = require("../controllers/ShareController");

const authMiddleware = require("../middleware/auth");

const { sharesFileUpload } = require("../middleware/picUpload");

router.post(
  "/add",
  authMiddleware.verifyAdminLogin,
  sharesFileUpload,
  shareController.addShare
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  shareController.getSharesStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  shareController.getShares
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  shareController.getSharesByName
);
router.get(
  "/get-by-link",
  authMiddleware.verifyAdminLogin,
  shareController.getShareByLink
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  sharesFileUpload,
  shareController.updateShare
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  shareController.deleteShare
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  shareController.deleteAll
);

module.exports = router;
