import FoodSchema from "../model/FoodSchema/FoodSchema.js";
import TokenModel from "../model/token/token.js";
import userModel from "../model/userSchema/userSchema.js";

const syncDB = async () => {
  await FoodSchema.sync({ alter: true, force: false });
  await userModel.sync({ alter: true, force: false });
  await TokenModel.sync({ alter: true, force: false });
};

export default syncDB;
