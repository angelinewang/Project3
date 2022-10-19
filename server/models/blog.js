import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comments: [String],
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: mongoose.Schema.ObjectId, ref: "Image" },
    //There is no way to find and delete the Image from the uploads folder without a reference to its ObjectID with the Blog Schema
    //Thus, I have changed the data saved under Image inside the Blog into the reference to the Image instead
    //You can ignore these changes if you wish to keep the origin schema, however that just means we cannot delete the image upon Blog deletion
    // image: String,
    tags: [String],
    comments: [commentSchema],
    //18 and 19 need double checking
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
