import express from "express";
import * as usersCtrl from "../../controllers/users.js";
import { checkAuth } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
// router.get("/info/:id", usersCtrl.getUserInfo);

// router.get("/:id", usersCtrl.getUserBlog);
// router.patch("/:id", usersCtrl.updatedProfile);
router
  .route("/:id")
  .get(usersCtrl.getUserBlog)
  .patch(checkAuth, usersCtrl.updatedProfile);
// .delete(checkAuth, blogControllers.del
// .route("/:id")
// .get(usersCtrl.getUserBlog)
// .delete(usersCtrl.deleteProfile);

export default router;
