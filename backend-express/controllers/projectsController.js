const { Project } = require("../models/projectsModel");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/projects"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage });

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
    const image_path = req.file
      ? `/uploads/projects/${req.file.filename}`
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
    const { id } = req.params;
    const { title, role, tools, description, github_link, demo_link } =
      req.body;
    const image_path = req.file
      ? `/uploads/projects/${req.file.filename}`
      : undefined;

    const updatedFields = {
      title,
      role,
      tools,
      description,
      image_path,
      github_link,
      demo_link,
    };

    // Remove undefined fields
    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const [affectedRows, [updatedProject]] = await Project.update(
      updatedFields,
      {
        where: { id },
        returning: true,
      }
    );

    if (!affectedRows) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json(updatedProject);
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
    const deleted = await Project.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project." });
  }
};
