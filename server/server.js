import express from "express";
//Image file upload done through multer
import multer from "multer";
// import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import userSchema from "./models/user.js";
import blogSchema from "./models/blog.js";

import fs from "file-system";

import Image from "./models/image.js";

import bodyParser from "body-parser";

import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/api/users.js";
import blogRoutes from "./routes/api/blogs.js";

import auth from "./config/auth.js";

import { connectToDb } from "./config/database.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(auth);

//START of image upload setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
//END of Image upload setup

// Proxy
app.use(express.static(join(__dirname, "..", "client", "build")));

// Put API routes here, before the "catch all" route

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
// app.use("/api/images", imageRoutes);

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
// app.get("/*", function (req, res) {
//   res.sendFile(path.join("../client/src/pages/ImageUpload/ImageUpload.jsx"));
// });

// Step 7 - the GET request handler that provides the HTML UI

app.post("/images", upload.single("Image"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
  };

  Image.collection.insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});

app.get("/images", (req, res) => {
  Image.collection.find().toArray((err, result) => {
    const imgArray = result.map((element) => element._id);
    console.log(imgArray);
    if (err) return console.log(err);
    res.send(imgArray);
  });
});

app.get("/images/:id", (req, res) => {
  var filename = req.params.id;
  Image.collection.findOne({ _id: ObjectId(filename) }, (err, result) => {
    if (err) return console.log(err);
    res.contentType("image/jpeg");
    res.send(result.image.buffer);
  });
});

// app.get("/", (req, res) => {
//   imgModel.find({}, (err, items) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("An error occurred", err);
//     } else {
//       res.render("../client/src/pages/ImageUpload/ImageUpload.jsx", {
//         items: items,
//       });
//     }
//   });
// });

// app.post("/", upload.single("image"), (req, res, next) => {
//   var obj = {
//     name: req.body.name,
//     desc: req.body.desc,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   imgModel.create(obj, (err, item) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // item.save();
//       res.redirect("/");
//     }
//   });
// });

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

async function startServer() {
  await connectToDb();

  app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
  });
}

startServer();
