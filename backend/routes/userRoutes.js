import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controller/userController.js";

const router = express.Router();

// get all users by method = GET
router.get("/all-users", getAllUsers);

// register users by method = POST
router.post("/register-user", registerController);

// login user by method = POST
router.post("/login-user", loginController);

export default router;
