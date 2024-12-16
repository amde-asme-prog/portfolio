const express = require("express");
const {
  getLandingContent,
  updateLandingContent,
  downloadCv,
  uploadFiles,
} = require("../controllers/landingContentController");
const router = express.Router();

router.get("/", getLandingContent);
router.post("/", uploadFiles, updateLandingContent);
router.get("/download-cv", downloadCv);

module.exports = router;
