const express = require("express");

const router = express.Router({ mergeParams: true });
const pageController = require("../controllers/PageController");

const { pageContentUpload } = require("../middleware/picUpload");

const authMiddleware = require("../middleware/auth");

router.get("/", pageController.getPage);
router.get("/last", pageController.getLastPages);
router.post(
  "/add",
  authMiddleware.verifyAdminLogin,
  pageContentUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  pageController.addPage
);
router.get(
  "/stats",
  authMiddleware.verifyAdminLogin,
  pageController.getPagesStats
);
router.get(
  "/get-all",
  // authMiddleware.verifyAdminLogin,
  pageController.getPages
);
router.get("/get-by-category", pageController.getPagesByCategory);
router.get(
  "/get-by-name",
  authMiddleware.verifyAdminLogin,
  pageController.getPagesByName
);
router.put(
  "/update",
  authMiddleware.verifyAdminLogin,
  pageContentUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  pageController.updatePage
);
router.delete(
  "/delete",
  authMiddleware.verifyAdminLogin,
  pageController.deletePage
);
router.delete(
  "/delete-all",
  authMiddleware.verifyAdminLogin,
  pageController.deleteAll
);

module.exports = router;
