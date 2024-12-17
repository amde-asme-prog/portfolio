const { Project } = require("../models/projectsModel");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/project"));
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
  const {
    title,
    role,
    tools,
    description,
    github_link,
    demo_link,
    image_path,
  } = req.body;
  const imageFile = req.file;
  try {
    let existingProject = await Project.findOne({
      where: { id: req.params.id },
    });

    // Delete the old file if a new image is uploaded
    const deleteOldFile = async (filePath) => {
      if (
        filePath &&
        fsSync.existsSync(path.resolve(__dirname, `../public/${filePath}`))
      ) {
        await fs.unlink(path.resolve(__dirname, `../public/${filePath}`));
      }
    };

    if (existingProject && imageFile) {
      await deleteOldFile(existingProject.image_path);
    }

    const dataToUpdate = {
      title,
      role,
      tools,
      description,
      image_path: imageFile
        ? `uploads/projects/${imageFile.filename}`
        : existingProject?.image_path,
      github_link,
      demo_link,
    };

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found." });
    } else {
      await existingProject.update(dataToUpdate);
      return res.status(200).json(existingProject);
    }
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
    const filePath = await Project.findOne({ where: { id } }).then(
      (project) => project.image_path
    );

    if (
      filePath &&
      fsSync.existsSync(path.resolve(__dirname, `../public/${filePath}`))
    ) {
      await fs.unlink(path.resolve(__dirname, `../public/${filePath}`));
    }
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
