const express = require("express");
const multer = require("multer");
const {
  getAboutContent,
  updateAboutContent,
  upload,
} = require("../controllers/aboutController");

const router = express.Router();

router.get("/", getAboutContent);
router.post("/", upload.single("image_path"), updateAboutContent);

module.exports = router;
