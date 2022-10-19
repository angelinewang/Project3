import Blog from "../models/blog.js";
import User from "../models/user.js";
import Image from "../models/image.js";
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
    const blog = await Blog.findById(req.params.id).populate("image author");
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
  let filePath;
  try {
    const data = req.body;
    if (req.file) {
      filePath = req.file.path;
      data.image = filePath;
    }
    let currentUser = await User.findById(userId);
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
    res.status(204).send(updatedBlog);
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
}

async function deleteBlog(req, res, next) {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    // await Image.findByIdAndDelete(oldBlog.image._id);

    // await Blog.findByIdAndDelete(req.params.id);
    // res.status(204).send("Blog deleted!", oldBlog);

    //There is no way to find and delete the Image from the uploads folder without a reference to its ObjectID with the Blog Schema
    //Thus, I have changed the data saved under Image inside the Blog into the reference to the Image instead
    //You can ignore these changes if you wish to keep the origin schema, however that just means we cannot delete the image upon Blog deletion
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
