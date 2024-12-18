const { Project } = require("../models/projectsModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const fsSync = require("fs");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads/project");
    if (!fsSync.existsSync(uploadDir)) {
      fsSync.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage });

// Helper function to delete files
const deleteFile = async (filePath) => {
  if (
    filePath &&
    fsSync.existsSync(path.resolve(__dirname, `../public/${filePath}`))
  ) {
    try {
      await fs.unlink(path.resolve(__dirname, `../public/${filePath}`));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }
};

// Get All Projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects." });
  }
};

// Add a New Project
exports.addProject = async (req, res) => {
  try {
    const { title, role, tools, description, github_link, demo_link } =
      req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required." });
    }

    const image_path = req.file
      ? `/uploads/project/${req.file.filename}`
      : null;

    const project = await Project.create({
      title,
      role,
      tools,
      description,
      image_path,
      github_link,
      demo_link,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error adding project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the project." });
  }
};

// Update an Existing Project
exports.updateProject = async (req, res) => {
  try {
    const { title, role, tools, description, github_link, demo_link } =
      req.body;
    const imageFile = req.file;

    let existingProject = await Project.findOne({
      where: { id: req.params.id },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    if (imageFile) {
      await deleteFile(existingProject.image_path);
    }

    const dataToUpdate = {
      title,
      role,
      tools,
      description,
      image_path: imageFile
        ? `uploads/project/${imageFile.filename}`
        : existingProject.image_path,
      github_link,
      demo_link,
    };

    await existingProject.update(dataToUpdate);
    res.status(200).json(existingProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the project." });
  }
};

// Delete a Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({ where: { id } });
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    await deleteFile(project.image_path);

    await Project.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project." });
  }
};
