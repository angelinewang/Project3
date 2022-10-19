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
  try {
    let filePath = req.file.path;
    let currentUser = await User.findById(userId);
    const data = req.body;
    data.author = userId;

    //The image field within the Blog must be the ObjectId of the Image in order to delete the image on Blog deletion
    const newImage = await Image.create(filePath);
    data.image = newImage._id;

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
    let oldBlog = await Blog.findById(req.params.id).populate("image");

    await Image.findByIdAndDelete(oldBlog.image._id);

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).send();

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
