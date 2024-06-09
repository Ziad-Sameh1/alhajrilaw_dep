const express = require("express");

const router = express.Router({ mergeParams: true });

const clientsController = require("../controllers/ClientController");

const authMiddleware = require("../middleware/auth");

const { clientsPicUpload } = require("../middleware/picUpload");

router.get("/top", clientsController.getTopClients);
router.post(
  "/add",
  authMiddleware.verifyAdminLogin,
  clientsPicUpload,
  clientsController.addClient
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  clientsController.getClientsStats
);
router.get("/get-all", clientsController.getClients);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  clientsController.getClientsByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  clientsPicUpload,
  clientsController.updateClient
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  clientsController.deleteClient
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  clientsController.deleteAll
);

module.exports = router;
