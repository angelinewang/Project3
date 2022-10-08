import Blog from "../models/Blog";
import { CastError } from "mongoose";

export async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
}

export async function getABlog(req, res, next) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: true, message: "Blog not found." });
    }
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

export async function createBlog(req, res, next) {
  let userId = req.user._id;
  try {
    let currentUser = await User.findById(userId);
    const data = req.body;
    data.author = userId;
    const newBlog = await Blog.create(data);
    currentUser.blogs.push(newBlog._id);
    await currentUser.save();
    res.json(newBlog);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateBlog(req, res, next) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
