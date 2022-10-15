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

//Ensures that blogs are always found with their "image" and "author" fields populated
// blogSchema.pre("find", function (doc, next) {
//   const blog = this;
//   if (blog.options._recursed) {
//     return next();
//   }
//   blog.populate({ path: "image author", options: { _recursed: true } });
//   next();
// });

// userSchema.pre("save", function (next) {
//   // 'this' will be set to the current document
//   const user = this;
//   if (!user.isModified("password")) return next();
//   // password has been changed - salt and hash it
//   bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
//     if (err) return next(err);
//     // replace the user provided password with the hash
//     user.password = hash;
//     next();
//   });
// });

export default mongoose.model("Blog", blogSchema);
