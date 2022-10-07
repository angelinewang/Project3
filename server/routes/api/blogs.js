import * as blogCtrls from "../../controllers/blogControllers";
import { Router } from "express";
import { checkAuth } from "../../middlewares/auth.js";

const router = Router();
router
  .route("/")
  .get(blogCtrls.getAllBlogs)
  .post(checkAuth, blogCtrls.createBlog);

router
  .route("/:id")
  .get(blogCtrls.getABlog)
  .patch(checkAuth, blogCtrls.updatedBlog)
  .delete(checkAuth, blogCtrls.deleteBlog);

export default router;
