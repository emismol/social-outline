//create model
const { Model, DataTypes } = require("mongoose");
const mongoose = require("../config/config.js");
class user extends Model {}
user.init(
  //create schema
  {
    username: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thoughts: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    friends: {
      type: DataTypes.STRING,
      // allowNull: false
    },
  },
  {
    mongoose,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
