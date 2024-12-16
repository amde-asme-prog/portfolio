const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// const LandingContent = sequelize.define("LandingContent", {
//   greeting: DataTypes.STRING,
//   introduction: DataTypes.TEXT,
//   name: DataTypes.STRING,
//   additional_text: DataTypes.TEXT,
//   typewriter_texts: DataTypes.JSONB,
//   reference_icons: DataTypes.JSONB,
//   image_path: DataTypes.STRING,
//   cv_path: DataTypes.STRING,
// });

const LandingContent = sequelize.define("LandingContent", {
  greeting: {
    type: DataTypes.STRING,
  },
  introduction: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  additional_text: {
    type: DataTypes.STRING,
  },
  typewriter_texts: {
    type: DataTypes.TEXT, // Stores JSON data as string
    get() {
      return JSON.parse(this.getDataValue("typewriter_texts") || "[]");
    },
    set(value) {
      this.setDataValue("typewriter_texts", JSON.stringify(value));
    },
  },
  reference_icons: {
    type: DataTypes.TEXT,
    get() {
      return JSON.parse(this.getDataValue("reference_icons") || "[]");
    },
    set(value) {
      this.setDataValue("reference_icons", JSON.stringify(value));
    },
  },
  image_path: {
    type: DataTypes.STRING,
  },
  cv_path: {
    type: DataTypes.STRING,
  },
});

module.exports = { sequelize, LandingContent };
