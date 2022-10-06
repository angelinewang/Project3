import * as blogCtrls from "../../controllers/blogControllers";
import { Router } from "express";

const router = Router();
router.route("/").get(blogCtrls.getAllBlogs);

export default router;
