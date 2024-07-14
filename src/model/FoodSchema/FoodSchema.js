import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const FoodModel = sequelize.define("Food", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default FoodModel;
