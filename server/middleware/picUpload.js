const multer = require("multer");
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

const staffImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appDir}/uploads/images/staff`);
  },
  filename: function (req, file, cb) {
    cb(null, req.query.unique + file.originalname);
  },
});

const clientsImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appDir}/uploads/images/clients`);
  },
  filename: function (req, file, cb) {
    cb(null, req.query.unique + file.originalname);
  },
});

const shareFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appDir}/uploads/pdfs/shares`);
  },
  filename: function (req, file, cb) {
    const splits = file.originalname.split(".");
    const fileExt = splits[splits.length - 1];
    cb(null, req.query.unique + "." + fileExt);
  },
});

const pageContentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("here1");
    console.log(req);
    cb(null, `${appDir}/uploads/pages`);
  },
  filename: function (req, file, cb) {
    const splits = file.originalname.split(".");
    const fileExt = splits[splits.length - 1];
    if (
      fileExt === "mp4" ||
      fileExt === "mov" ||
      fileExt === "wmw" ||
      fileExt === "avi" ||
      fileExt === "mkv"
    ) {
      cb(null, req.query.unique2 + "." + fileExt);
    } else {
      cb(null, req.query.unique1 + "." + fileExt);
    }
  },
});

const staffPicUpload = multer({ storage: staffImagesStorage }).single(
  "profilePic"
);
const clientsPicUpload = multer({ storage: clientsImagesStorage }).single(
  "clientPic"
);
const sharesFileUpload = multer({ storage: shareFileStorage }).single(
  "shareFile"
);

const pageContentUpload = multer({ storage: pageContentStorage });

module.exports = {
  staffPicUpload,
  clientsPicUpload,
  sharesFileUpload,
  pageContentUpload,
};
