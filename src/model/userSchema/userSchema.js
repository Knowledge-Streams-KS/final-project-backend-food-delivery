import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const userModel = sequelize.define("User", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PassWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CartData: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default userModel;
