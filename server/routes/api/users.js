import express from "express";
import * as usersCtrl from "../../controllers/users.js";
import blogControllers from "../../controllers/blogControllers.js";
import { checkAuth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

router
  .route("/:id")
  .get(blogControllers.getUserBlog)
  .patch(checkAuth, usersCtrl.updatedProfile);
// .delete(usersCtrl.deleteProfile);

export default router;
