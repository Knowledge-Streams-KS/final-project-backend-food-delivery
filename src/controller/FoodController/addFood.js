import FoodModel from "../../model/FoodSchema/FoodSchema.js";

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
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  },

  // update: (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const payload = req.body;
  //     const FoodIndex = Foods.findIndex((ele) => ele.id == id);
  //     if (FoodIndex == -1) {
  //       return res.status(404).json({
  //         message: "Data not founded",
  //       });
  //     }
  //     if (payload.id) {
  //       Foods[FoodIndex].id = payload.id;
  //     }
  //     if (payload.Name) {
  //       Foods[FoodIndex].Name = payload.Name;
  //     }
  //     if (payload.cohort) {
  //       Foods[FoodIndex].cohort = payload.cohort;
  //     }
  //     res.status(200).json({
  //       message: "Student Updated",
  //       students,
  //     });
  //   } catch (error) {
  //     res.status(404).json({
  //       message: "Student not founded",
  //     });
  //   }
  // },
  // delete: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const productToDelete = await productModel.findByPk(id);
  //     if (!productToDelete) {
  //       res.status(404).json({
  //         message: "Product you are trying to delete does not exist",
  //       });
  //     } else {
  //       await productModel.destroy({
  //         where: {
  //           id: id,
  //         },
  //       });
  //       res.json({
  //         message: "Product deleted successfully",
  //       });
  //     }
  //   } catch (err) {
  //     res.status(500).json({
  //       message: "Internal Server Error",
  //     });
  //   }
  // },
};

export default FoodController;
