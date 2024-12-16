const About = require("../models/aboutModel");
const path = require("path");
const multer = require("multer");
const fs = require("fs/promises");
const fsSync = require("fs");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../public/uploads/about");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Use timestamp for unique filenames
  },
});

exports.upload = multer({ storage });

// Utility: Safely parse JSON

// Get About Content
exports.getAboutContent = async (req, res) => {
  try {
    let content = await About.findOne({ where: { id: 1 } });

    if (!content) {
      content = await About.create({
        about_me: "",
        core_title: "",
        core_subtitle: "",
        core_lists: [],
        interest_title: "",
        interest_subtitle: "",
        interests_lists: [],
        image_path: null,
      });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching about content:", error);
    res.status(500).json({ error: "Error retrieving about content" });
  }
};

// Update About Content
exports.updateAboutContent = async (req, res) => {
  const {
    about_me,
    core_title,
    core_subtitle,
    core_lists,
    interest_title,
    interest_subtitle,
    interests_lists,
  } = req.body;

  const imageFile = req.file; // Single file upload expected

  try {
    let existingContent = await About.findOne({ where: { id: 1 } });

    // Delete the old file if a new image is uploaded
    const deleteOldFile = async (filePath) => {
      if (
        filePath &&
        fsSync.existsSync(path.resolve(__dirname, `../public/${filePath}`))
      ) {
        await fs.unlink(path.resolve(__dirname, `../public/${filePath}`));
      }
    };

    if (existingContent && imageFile) {
      await deleteOldFile(existingContent.image_path);
    }

    const dataToUpdate = {
      about_me,
      core_title,
      core_subtitle,
      core_lists,
      interest_title,
      interest_subtitle,
      interests_lists,
      image_path: imageFile
        ? `uploads/about/${imageFile.filename}`
        : existingContent?.image_path,
    };

    if (!existingContent) {
      existingContent = await About.create(dataToUpdate);
      return res.status(200).json(existingContent);
    } else {
      await existingContent.update(dataToUpdate);
      return res.status(200).json(existingContent);
    }
  } catch (error) {
    console.error("Error updating about content:", error);
    res.status(500).json({ error: "Error updating about content" });
  }
};
