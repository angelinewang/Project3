import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import formidable from "formidable";

dotenv.config();

const SECRET = process.env.SECRET;

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
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
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

// ! User
export async function getUserBlog(req, res, next) {
  try {
    const user = await User.findById(req.params.id).populate("blogs");

    if (!user) {
      return res.status(400).json({ error: true, message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    if (error instanceof CastError) {
      res
        .status(400)
        .send({ error: "Invalid id - please enter the correct id." });
    } else {
      next(error);
    }
  }
}

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
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
