const Sequelize = require("sequelize");
const {DataTypes} =require("sequelize");
const sequelize = require("../utils/database");
const User = sequelize.define("user", {
  userId: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
  name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  rank: { type: DataTypes.STRING, allowNull: false },
  cash:{type:DataTypes.INTEGER, allowNull: false}
});

module.exports = User;
