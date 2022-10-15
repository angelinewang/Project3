import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import formidable from "formidable";

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
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        user.image = "";
        console.log(user);
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// // TODO: Add profile info
// export async function addProfile(req, res, next) {
//   console.log("req received on server");
//   let userId = req.user._id;
//   try {
//     let currentUser = await User.findById(userId);
//     const data = req.body;
//     const addedProfile = await User.create(data);
//     // currentUser.bio.push(data);

//     await currentUser.save();

//     // const currentUser = await User.findByIdAndUpdate(req.user._id, req.body, {
//     //   new: true,
//     // });

//     res.json(addedProfile);
//   } catch (error) {
//     next(error);
//   }
// }

// TODO: Update profile info
export async function updatedProfile(req, res, next) {
  console.log("check req body", req.body);
  try {
    const updatedProfile = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    console.log(updatedProfile);
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
}

// // TODO: Delete profile info
// export async function deleteProfile(req, res, next) {
//   console.log("req body", req.body);
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// }

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
