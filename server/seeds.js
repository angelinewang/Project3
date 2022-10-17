import mongoose from "mongoose";
import { connectToDb } from "./config/database.js";
import dotenv from "dotenv";

import User from "./models/user.js";
import Blog from "./models/blog.js";
import Image from "./models/image.js";

dotenv.config();
await connectToDb();

// const image1 = await Image.create({
//   img: {
//     data: "https://images.unsplash.com/photo-1628015081036-0747ec8f077a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
//   },
// });

// const image2 = await Image.create({
//   img: {
//     data: "https://images.unsplash.com/photo-1662581871665-f299ba8ace07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
//   },
// });

// const image3 = await Image.create({
//   img: {
//     data: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
//   },
// });

//Blogs added through User

Blog.deleteMany({}).then(() => {
  console.log("Seeding Blogs connected!");
});

Blog.insertMany([
  {
    title: "How-to JavaScript",
    description: "Your go-to guide to coding in JavaScript",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.",
    image: "6341871058225b9257903e6e",
    tags: ["JavaScript", "How-To"],
    comments: { comments: ["Awesome", "Great"] },
    //18 and 19 need double checking
    author: "6341888e3ef0c4526bc0d224",
  },
  {
    title: "Write your first line of code!",
    description: "Step-by-step tutorial to get started with coding.",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.",
    image: "6341871058225b9257903e71",
    tags: ["Coding", "Tutorial"],
    comments: { comments: ["Beautiful", "Fantastic"] },
    //18 and 19 need double checking
    author: "6341888e3ef0c4526bc0d219",
  },
  {
    title: "First MongoDB",
    description: "How to connect to MongoDB on Windows",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab ex dolorem quaerat labore velit incidunt amet, adipisci, vero porro possimus nulla veritatis assumenda eius quisquam sed repellat temporibus laboriosam.",
    image: "6341871058225b9257903e73",
    tags: ["MongoDB", "Databases"],
    comments: { comments: ["Cool story", "Nice one"] },
    //18 and 19 need double checking
    author: "6341888e3ef0c4526bc0d219",
  },
]).then(() => {
  console.log("Blogs asynchronously added");
});

// User.deleteMany({}).then(() => {
//   console.log("Seeding Users connected!");
// });

// User.insertMany([
//   {
//     name: "Angeline",
//     email: "angeline@gmail.com",
//     password: "Test123",
//     blogs: ["6341881d24ab218818a7ceb7"],
//   },
//   {
//     name: "Joe",
//     email: "joe@gmail.com",
//     password: "Test123",
//     blogs: ["6341881d24ab218818a7ceba"],
//   },
//   {
//     name: "John",
//     email: "John@gmail.com",
//     password: "Test123",
//     blogs: ["6341881d24ab218818a7cebd"],
//   },
// ]).then(() => {
//   console.log("User Data was asynchronously added");
// });

//1. Finish seeding all images like above, seed all data
//2. Test and finalise detail page with seed data

// require('dotenv').config()
// require('./config/database')

// const Tweet = require('./models/Tweet')

// Tweet.deleteMany({}).then(() => {
//     console.log('Database connected!')
// })

// Tweet.insertMany([
//     {
//         name: 'Angeline',
//         description: 'Today is a good day'},
//     {
//         name: 'Ryan',
//         description: 'Today is a good day'},
//     {
//         name: 'Matt',
//         description: 'Today is a good day'},
//     {
//         name: 'Manohisoa',
//         description: 'Love Express!'},
//     {
//         name: 'Ana',
//         description: 'Today is a good day'},
// ]).then(() => {
//     console.log("Data was asynchronously added")
// })
// //Needs to be like the schema we passed in in the model
