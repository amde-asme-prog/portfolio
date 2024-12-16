const multer = require("multer");
const path = require("path");

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/about")); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
