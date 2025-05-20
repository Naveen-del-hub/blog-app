import express from "express";
import {
  allBlogDeleteController,
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

// Delete all blogs of a perticular user by method = DELETE

router.delete("/all-blog-delete/:id", allBlogDeleteController);

// delete blog by method = DELETE
router.delete("/delete-blog/:id", deleteBlogController);

export default router;
