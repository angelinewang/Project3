import Blog from "../models/Blog";

export async function getAllBlogs(req, res, next) {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
    res.status;
  } catch (err) {
    next(err);
  }
}
