import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  updateBlogController,
} from "../controller/blogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all blogs by method = GET
router.get("/get-blogs", getBlogController);

// Create blog by method = POST
router.post("/create-blog", authMiddleware, createBlogController);

// update blog by method = PUT
router.put("/update-blog/:id", updateBlogController);

// delete blog by method = DELETE
router.delete("/delete-blog/:id", deleteBlogController);

export default router;
