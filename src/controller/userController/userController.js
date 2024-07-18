import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../../model/userSchema/userSchema.js";
import TokenModel from "../../model/token/token.js";

const authController = {
  signUp: async (req, res) => {
    try {
      const payload = req.body;
      const userCheck = await userModel.findOne({
        where: {
          Email: payload.Email,
        },
      });
      if (userCheck) {
        return res.status(400).json({
          message: "User ALready Exist",
        });
      }
      const hpassword = await hash(payload.PassWord, 10);

      const user = await userModel.create({
        Name: payload.Name,
        Email: payload.Email,
        PassWord: hpassword,
      });
      res.status(400).json({
        message: "User Created Successfully!",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },

  LogIn: async (req, res) => {
    try {
      const payload = req.body;
      const UserCheck = await userModel.findOne({
        where: {
          Email: payload.Email,
        },
      });
      if (!UserCheck) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      const comparePassword = await compare(
        payload.PassWord,
        UserCheck.PassWord
      );
      if (!comparePassword) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      const data = {
        id: UserCheck.id,
        Email: UserCheck.Email,
        // Name: UserCheck.Name,
      };

      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      await TokenModel.create({
        token,
      });
      console.log(token);
      res.json({ data, token });
    } catch (error) {
      res.status(500).json({ message: "Internal server" });
      console.log(error);
    }
  },
};

export default authController;
