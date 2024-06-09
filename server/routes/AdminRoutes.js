const express = require("express");

const router = express.Router({ mergeParams: true });

const adminController = require("../controllers/AdminController");

const authMiddleware = require("../middleware/auth");

router.post("/login", adminController.login);
router.post("/logout", authMiddleware.verifyAdminLogin, adminController.logout);
router.post("/add", authMiddleware.verifyAdminLogin, adminController.addAdmin);
router.get(
  "/status",
  authMiddleware.verifyAdminLogin,
  adminController.checkLoginStatus
);
router.get(
  "/get-email",
  authMiddleware.verifyAdminLogin,
  adminController.getEmailFromToken
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  adminController.getAdminStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  adminController.getAdmins
);
router.get(
  "/get-by-email",
  authMiddleware.verifyAdminLogin,
  adminController.getAdminByEmailAddress
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  adminController.updateAdmin
);
router.put(
  "/change-password",
  authMiddleware.verifyAdminLogin,
  adminController.changePassword
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  adminController.deleteAdmin
);

module.exports = router;
