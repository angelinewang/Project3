import Blog from "../models/blog.js";
import User from "../models/user.js";
import { CastError } from "mongoose";

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find().populate("author");
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
}

// ! Blog
async function getABlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    if (!blog) {
      return res.status(400).json({ error: true, message: "Blog not found." });
    }
    return res.json(blog);
  } catch (error) {
    if (error instanceof CastError) {
      res
        .status(400)
        .send({ error: "Invalid id - please enter the correct id." });
    } else {
      next(error);
    }
  }
}

async function createBlog(req, res, next) {
  let userId = req.user._id;
  try {
    let filePath = req.file.path;
    let currentUser = await User.findById(userId);
    const data = req.body;
    data.author = userId;
    data.image = filePath;
    const newBlog = await Blog.create(data);
    console.log(newBlog);
    currentUser.blogs.push(newBlog._id);
    await currentUser.save();
    res.json(newBlog);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function updatedBlog(req, res, next) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(204).send();
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default {
  createBlog,
  getAllBlogs,
  getABlog,
  updatedBlog,
  deleteBlog,
};
