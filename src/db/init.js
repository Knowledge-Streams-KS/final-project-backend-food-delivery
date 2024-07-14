import FoodSchema from "../model/FoodSchema/FoodSchema.js";

const syncDB = async () => {
  await FoodSchema.sync({ alter: true, force: false });
};

export default syncDB;
