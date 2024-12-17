const path = require("path");
const fs = require("fs");
const { LandingContent } = require("../models/landingModel");
const multer = require("multer");

// Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = ["uploads/cv", "uploads/image"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = file.fieldname === "cv_path" ? "cv" : "image";
    cb(null, path.join(__dirname, `../public/uploads/${fileType}`));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "cv_path") {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error("Please upload a valid document file"));
    }
  } else if (file.fieldname === "image_path") {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

exports.uploadFiles = upload.fields([
  { name: "image_path", maxCount: 1 },
  { name: "cv_path", maxCount: 1 },
]);

exports.getLandingContent = async (req, res) => {
  try {
    const content = await LandingContent.findOne({ where: { id: 1 } });
    if (!content) {
      return res.status(404).json({ error: "Landing content not found." });
    }
    res.status(200).json(content);
  } catch (err) {
    console.error("Error fetching landing content:", err.message);
    res.status(500).json({ error: "Failed to fetch landing content." });
  }
};

exports.updateLandingContent = async (req, res) => {
  const {
    greeting,
    introduction,
    name,
    additional_text,
    typewriter_texts,
    reference_icons,
  } = req.body;

  try {
    const imageFile = req.files?.image_path?.[0];
    const cvFile = req.files?.cv_path?.[0];

    // Find existing content
    let content = await LandingContent.findOne({ where: { id: 1 } });

    // Handle file deletions
    const deleteOldFile = (filePath) => {
      if (filePath && fs.existsSync(path.resolve(filePath))) {
        fs.unlinkSync(path.resolve(filePath));
      }
    };

    if (content) {
      if (imageFile) deleteOldFile(content.image_path);
      if (cvFile) deleteOldFile(content.cv_path);
    }

    // Prepare updated data
    const dataToUpdate = {
      greeting,
      introduction,
      name,
      additional_text,
      typewriter_texts,
      reference_icons,
    };

    // Add file paths if files were uploaded
    if (imageFile) {
      dataToUpdate.image_path = imageFile
        ? `uploads/image/${imageFile.filename}`
        : undefined;
    }
    if (cvFile) {
      dataToUpdate.cv_path = cvFile
        ? `uploads/cv/${cvFile.fieldname}`
        : undefined;
    }

    // Create or update content
    if (!content) {
      content = await LandingContent.create(dataToUpdate);
    } else {
      await content.update(dataToUpdate);
    }

    res.status(200).json(content);
  } catch (error) {
    console.error("Error updating landing content:", error.message);
    res.status(500).json({ error: "Failed to update landing content." });
  }
};

exports.downloadCv = async (req, res) => {
  try {
    const content = await LandingContent.findOne({ where: { id: 1 } });
    if (!content || !content.cv_path) {
      return res.status(404).json({ error: "CV not found." });
    }

    const cvFilePath = path.resolve(content.cv_path);
    if (!fs.existsSync(cvFilePath)) {
      return res.status(404).json({ error: "CV file not found." });
    }

    res.download(cvFilePath, "cv-amdebirhan.pdf", (err) => {
      if (err) {
        console.error("Error downloading CV:", err.message);
        res.status(500).json({ error: "Failed to download CV." });
      }
    });
  } catch (error) {
    console.error("Error downloading CV:", error.message);
    res.status(500).json({ error: "Failed to download CV." });
  }
};
