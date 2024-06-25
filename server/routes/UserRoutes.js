const express = require("express");

const router = express.Router({ mergeParams: true });

const userController = require("../controllers/UserController");

const authMiddleware = require("../middleware/auth");

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/add", authMiddleware.verifyAdminLogin, userController.addUser);
router.get(
  "/status",
  authMiddleware.verifyUserLogin,
  userController.checkLoginStatus
);
router.get(
  "/get-email",
  authMiddleware.verifyAdminLogin,
  userController.getEmailFromToken
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  userController.getUserStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  userController.getUsers
);
router.get(
  "/get-by-email",
  authMiddleware.verifyAdminLogin,
  userController.getUserByEmailAddress
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  userController.updateUser
);
router.put(
  "/change-password",
  authMiddleware.verifyUserLogin,
  userController.changePassword
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  userController.deleteUser
);

module.exports = router;
