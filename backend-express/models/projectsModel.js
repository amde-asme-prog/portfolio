const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adj

const Project = sequelize.define("Projects", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tools: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  demo_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { sequelize, Project };
