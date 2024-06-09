const express = require("express");

const router = express.Router({ mergeParams: true });

const employeeController = require("../controllers/EmployeeController");

const authMiddleware = require("../middleware/auth");

const { staffPicUpload } = require("../middleware/picUpload");

router.post(
  "/add",
//   authMiddleware.verifyAdminLogin,
  staffPicUpload,
  employeeController.addStaff
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  employeeController.getStaffStats
);
router.get("/get-all", employeeController.getStaff);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  employeeController.getEmployeeByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  staffPicUpload,
  employeeController.updateEmployee
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  employeeController.deleteEmployee
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  employeeController.deleteAll
);

module.exports = router;
