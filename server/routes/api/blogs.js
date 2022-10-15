<<<<<<< HEAD
import * as blogCtrl from "../../controllers/blogControllers.js";
=======
import blogControllers from "../../controllers/blogControllers.js";
>>>>>>> 0a05a1811557e767b6146a9850b353eb1441df31
import { Router } from "express";
import { checkAuth } from "../../middlewares/auth.js";
import uploadFile from "../../middlewares/upload.js";

const router = Router();
router
  .route("/")
<<<<<<< HEAD
  .get(blogCtrl.getAllBlogs)
  .post(checkAuth, blogCtrl.createBlog);

router
  .route("/:id")
  .get(blogCtrl.getABlog)
  .patch(checkAuth, blogCtrl.updateBlog)
  .delete(checkAuth, blogCtrl.deleteBlog);
=======
  .get(blogControllers.getAllBlogs)
  .post(checkAuth, uploadFile, blogControllers.createBlog);

router
  .route("/:id")
  .get(blogControllers.getABlog)
  .patch(checkAuth, blogControllers.updatedBlog)
  .delete(checkAuth, blogControllers.deleteBlog);
>>>>>>> 0a05a1811557e767b6146a9850b353eb1441df31

export default router;
