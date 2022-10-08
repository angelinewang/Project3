import Blog from "../models/blog.js";
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
  try {
    const blog = await Blog(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).send({
      error:
        "You must provide a title, description and content when creating a blog.",
    });
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
