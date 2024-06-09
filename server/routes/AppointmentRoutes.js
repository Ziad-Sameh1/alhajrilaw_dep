const express = require("express");

const router = express.Router({ mergeParams: true });

const appointmentController = require("../controllers/AppointmentController");

const authMiddleware = require("../middleware/auth");

router.post("/add", appointmentController.addAppointment);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  appointmentController.getAppointmentsStats
);
router.get(
  "/get-all",
  authMiddleware.verifyAdminLogin,
  appointmentController.getAppointments
);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  appointmentController.getAppointmentsByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  appointmentController.updateAppointment
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  appointmentController.deleteAppointment
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  appointmentController.deleteAll
);

module.exports = router;
