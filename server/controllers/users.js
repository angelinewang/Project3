import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

// export async function getUserBlogs(req, res, next) {
//   try {
//     // console.log(req.params.id);
//     const user = await User.findById();
//     blog.populate("author");
//     console.log(blog);
//     if (!blog) {
//       return res.status(400).json({ error: true, message: "Blog not found." });
//     }
//     return res.json(blog);
//   } catch (error) {
//     if (error instanceof CastError) {
//       res
//         .status(400)
//         .send({ error: "Invalid id - please enter the correct id." });
//     } else {
//       next(error);
//     }
//   }
// }

// export async function getUserInfo(req, res) {
//   try {
//     const user = User.findById(req.params.id).populate();
//     return res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    console.log(err);
    res.status(400).json(err);
  }
}

export async function login(req, res) {
  try {
    console.log("Reached login function");
    let user = await User.findOne({ email: req.body.email }).populate("blogs");
    //Blogs successfully populated
    console.log(user.blogs);
    if (!user) return res.status(401).json({ err: "bad credentials" });
    if (user.password == req.body.password) {
      console.log("Reached the conditional function");
      const token = createJWT(user);
      res.json({ token });
    } else {
      return res.status(401).json({ err: "bad credentials" });
    }

    //Pass in custom error messages so I know which actual error i
    //More specific responses from server, the easier to find it
    //Better error-handling
    //YouTube video on debugging: Place breakpoints where it would pause code, line by line keep going until it gets to the error
    //Debugging in VSCode, and debugging for client-side stuff: Debugger

    // How can I approach it step by step to figure out how to fic it
    // Console.logging at different points to see where the error is
    // Did it reach the server? Which line in the control function caused it?
    // Understanding the data flow from beginning to end, timeline

    // user.comparePassword(req.body.password, (err, isMatch) => {
    //   console.log(isMatch);
    //   if (isMatch) {
    //     console.log("Reached the conditional function");
    //     const token = createJWT(user);
    //     res.json({ token });
    //   } else {
    //     return res.status(401).json({ err: "bad credentials" });
    //   }
    // });

    //Implement Bcrypt and then use the comparePassword login to compare properly
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  console.log("Reached CreateJWT");
  console.log(user.blogs);
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
