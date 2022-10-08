import Blog from "../models/blog.js";
import { CastError } from "mongoose";

async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find();
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

    res.json(blog);
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

// ! User
async function getUserBlog(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate("blogs");
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found." });
    }

    res.json(user);
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
  console.log(req);
  try {
    let currentUser = await User.findById(userId);
    const data = req.body;
    // console.log(data);
    data.author = userId;
    const newBlog = await Blog.create(data);
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
  getUserBlog,
  updatedBlog,
  deleteBlog,
};
