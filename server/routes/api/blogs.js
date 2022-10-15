import blogControllers from "../../controllers/blogControllers.js";
import { Router } from "express";
import { checkAuth } from "../../middlewares/auth.js";
import uploadFile from "../../middlewares/upload.js";

const router = Router();
router
  .route("/")

  .get(blogControllers.getAllBlogs)
  .post(checkAuth, uploadFile, blogControllers.createBlog);

router
  .route("/:id")
  .get(blogControllers.getABlog)
  .patch(checkAuth, blogControllers.updatedBlog)
  .delete(checkAuth, blogControllers.deleteBlog);

export default router;
