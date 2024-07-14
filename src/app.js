import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/config.js";
import syncDB from "./db/init.js";
import AllRoutes from "./Routes/index.js";

const appData = express();
appData.use(express.json());
appData.use("/uploads", express.static("uploads"));

appData.use(cors());
connectDB();
syncDB().then(console.log("DB Synced!"));
appData.use(AllRoutes);

appData.listen(3000, () => {
  console.log("Server Started!");
});
