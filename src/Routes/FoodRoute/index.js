import { Router } from "express";
import FoodController from "../../controller/FoodController/addFood.js";
import multer from "multer";

const FoodRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

FoodRouter.get("/Food", FoodController.getAll);
FoodRouter.get("/Food/:id", FoodController.getSingle);
FoodRouter.post("/Food", uploads.single("Image"), FoodController.create);

export default FoodRouter;
