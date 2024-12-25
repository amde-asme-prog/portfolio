const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust this path based on your setup
const ServiceModel = sequelize.define("Service", {
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ServiceModel;
