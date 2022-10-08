import express from "express";
import * as usersCtrl from "../../controllers/users.js";
import blogControllers from "../../controllers/blogControllers.js";

const router = express.Router();
/*---------- Public Routes ----------*/
router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

router.get("/:id", blogControllers.getUserBlog);
/*---------- Protected Routes ----------*/

export default router;
