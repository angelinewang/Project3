import * as blogCtrl from "../../controllers/blogControllers.js";
import { Router } from "express";
import { checkAuth } from "../../middlewares/auth.js";

const router = Router();
router
  .route("/")
  .get(blogCtrl.getAllBlogs)
  .post(checkAuth, blogCtrl.createBlog);

router
  .route("/:id")
  .get(blogCtrl.getABlog)
  .patch(checkAuth, blogCtrl.updateBlog)
  .delete(checkAuth, blogCtrl.deleteBlog);

export default router;
