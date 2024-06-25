const express = require("express");

const router = express.Router({ mergeParams: true });

const checkpointController = require("../controllers/CheckpointController");

const authMiddleware = require("../middleware/auth");

router.post(
  "/add",
  authMiddleware.verifyUserLogin,
  checkpointController.addCheckpoint
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  checkpointController.getCheckpointsStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  checkpointController.getCheckpoints
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  checkpointController.getCheckpointsByName
);

router.get(
  "/user",
  authMiddleware.verifyUserOrAdminLogin,
  checkpointController.getCheckpointsByUser
);

router.get(
  "/user/latest",
  authMiddleware.verifyAdminLogin,
  checkpointController.getLatestCheckpointByUser
);

router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  checkpointController.updateCheckpoint
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  checkpointController.deleteCheckpoint
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  checkpointController.deleteAll
);

module.exports = router;
