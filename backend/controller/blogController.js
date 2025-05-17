import mongoose from "mongoose";
import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";

// Get blogs
export const getBlogController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});

    if (!blogs) {
      return res.status(201).send({
        message: "No blogs found",
        success: false,
        blogs,
      });
    }

    return res.status(200).send({
      message: "Get blogs successfully",
      success: true,
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting the blogs",
      success: false,
      error,
    });
  }
};

// Create blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        message: "User not available",
        success: false,
      });
    }

    const newBlog = new blogModel({ title, description, image, user });

    const session = await mongoose.startSession();

    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();

    return res.status(200).send({
      message: "Blog Created Succesfully",
      success: true,
      title: newBlog.title,
    });
  } catch (error) {
    return res.status(400).send({
      message: "error while creating the blog",
      success: false,
      error,
    });
  }
};

// Update blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, image } = req.body;

    const updateBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      message: "Blog updated successfully",
      success: true,
      updateBlog,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Error while updating the blog",
      success: false,
      error,
    });
  }
};

// Delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const deleteBlog = await blogModel.findOneAndDelete(id).populate("user");

    if (!deleteBlog) {
      return res.status(400).send({
        message: "Blog not found",
        success: true,
      });
    }

    if (!deleteBlog.user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }

    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();

    // await blogModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Blog deleted succesfully",
      success: true,
    });
  } catch (error) {
    console.log("Error while deleting the user", error);
    return res.status(400).send({
      message: "Error while Deleting the message",
      success: false,
      error,
    });
  }
};
