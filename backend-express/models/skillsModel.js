const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust this path based on your setup

const SkillsModel = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proficiency: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { sequelize, SkillsModel };
