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

FoodRouter.get("/Food/List", FoodController.getAll);
FoodRouter.get("/Food/:id", FoodController.getSingle);
FoodRouter.post("/Food/add", uploads.single("Image"), FoodController.create);

// FoodRouter.post("/Food/remove", uploads.single("Image"), FoodController.create);
// FoodRouter.put("/Food/:id", FoodController.update);
FoodRouter.delete(
  "/Food/remove",
  uploads.single("Image"),
  FoodController.delete
);

export default FoodRouter;
