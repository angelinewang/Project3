import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comments: [String],
});

const tagSchema = new mongoose.Schema({
  tags: [String],
});

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    // image: { data: Buffer, contentType: String },
    image: String,
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
