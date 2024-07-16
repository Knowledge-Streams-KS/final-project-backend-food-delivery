import FoodModel from "../../model/FoodSchema/FoodSchema.js";
import fs from "fs";
import path from "path";

const FoodController = {
  getAll: async (req, res) => {
    try {
      const Food = await FoodModel.findAll();
      if (Food.length == 0) {
        res.status(404).json({
          message: "No Food found",
        });
      } else {
        res.json(Food);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getSingle: async (req, res) => {
    try {
      const id = req.params.id;
      const Food = await FoodModel.findByPk(id);
      if (!Food) {
        res.status(404).json({
          message: "Food with this doesnot exist",
        });
      } else {
        res.json({
          data: Food,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: async (req, res) => {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({
        message: "No image file uploaded",
      });
    }
    let image_file = `${req.file.filename}`;

    console.log("File:", req.file);
    console.log("File:", req.file.filename);
    try {
      const payload = req.body;

      console.log("Body:", req.body);
      const Food = await FoodModel.create({
        Name: payload.Name,
        Description: payload.Description,
        Price: payload.Price,
        Image: image_file,
        Category: payload.Category,
      });

      return res.status(200).json({
        message: "Food Added",
        Food,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;
      console.log("Payload: ", payload);
      // Find the food item by ID
      const food = await FoodModel.findByPk(id);
      console.log("Food:", food);
      if (!food) {
        return res.status(404).json({
          message: "Food not found",
        });
      }
      // Update the food item with the new data
      if (payload.Name) {
        food.Name = payload.Name;
      }
      if (payload.Description) {
        food.Description = payload.Description;
      }
      if (payload.Price) {
        food.Price = payload.Price;
      }
      if (payload.Image) {
        food.Image = payload.Image; // Ensure the field name matches your schema
      }
      if (payload.Category) {
        food.Category = payload.Category;
      }
      // Save the updated food item
      await food.save();
      console.log(food);
      console.log("Payload", payload);
      console.log("Request: ", req);
      console.log(payload.food);
      res.status(200).json({
        message: "Food Updated",
        food,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const food = await FoodModel.findByPk(id);
      if (!food) {
        return res.status(404).json({
          message: "Food you are trying to delete does not exist",
        });
      } else {
        const filePath = path.join("uploads", food.Image);

        // Use fs.unlink to delete the file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
            return res.status(500).json({
              message: "Error deleting file",
              error: err.message,
            });
          } else {
            console.log("File deleted successfully");
          }
        });

        // Delete the record from the database
        await FoodModel.destroy({
          where: {
            id: id,
          },
        });

        return res.json({
          message: "Food deleted successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  },
};

export default FoodController;
