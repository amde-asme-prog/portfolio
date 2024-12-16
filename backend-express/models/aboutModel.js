const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust this path based on your setup

const About = sequelize.define(
  "About",
  {
    about_me: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    core_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    core_subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    core_lists: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    interest_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interest_subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interests_lists: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "about_content",
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

module.exports = About;
