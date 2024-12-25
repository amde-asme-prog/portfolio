const express = require("express");
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  upload,
} = require("../controllers/projectsController");

const router = express.Router();

// Routes
router.get("/", getProjects);
router.post("/", upload.single("image_path"), addProject);
router.put("/:id", upload.single("image_path"), updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
