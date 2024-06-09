const express = require("express");

const router = express.Router({ mergeParams: true });

const messageController = require("../controllers/MessageController");

const authMiddleware = require("../middleware/auth");

router.post("/add", messageController.addMessage);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  messageController.getMessagesStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  messageController.getMessages
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  messageController.getMessagesByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  messageController.updateMessage
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  messageController.deleteMessage
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  messageController.deleteAll
);

module.exports = router;
