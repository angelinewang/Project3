import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 6;

// var schemaOptions = {
//   toObject: {
//     virtuals: true,
//   },
//   toJSON: {
//     virtuals: true,
//   },
// };

// const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

var userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    image: { data: Buffer, contentType: String },
    socialMediaProfiles: [
      {
        platform: String,
        linkToProfile: String,
      },
    ],

    blogs: [{ type: mongoose.Schema.ObjectId, ref: "Blog" }],
  }
  // schemaOptions
  // {
  //   timestamps: true,
  //   toJSON: { toObjectOptions {virtuals: true } },
  //   toObject: { virtuals: true },
  // }
  // { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// userSchema.virtual("blogs", {
//   ref: "Blog",
//   localField: "_id",
//   foreignField: "author",
// });

userSchema.set("toJSON", {
  //Below line adds the Blogs population to the JSON content
  virtuals: true,
  transform: function (doc, res) {
    console.log("Reached userSchema to JSON");
    console.log(res);
    // remove the password property when serializing doc to JSON
    delete res.password;
    // res.populate({
    //   path: "blogs",
    //   select: "title author",
    //   options: { _recursed: true },
    // });
    // exec();
    return res;
  },
});

//Below broke the program and made the user undiscoverable
// Ensures that users are always found with their "image" and "author" fields populated
// userSchema.pre("findOne", function (doc, next) {
//   const user = this;
// if (user.options._recursed) {
//   return next();
// }
//   user.populate({
//     path: "blogs",
//     select: "title author",
//     // options: { _recursed: true },
//   });
//   next();
// });

userSchema.pre("save", function (next) {
  // 'this' will be set to the current document
  const user = this;
  if (!user.isModified("password")) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  // bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
  //   if (err) return cb(err);
  //   cb(null, isMatch);
  // });
  if (this.password == tryPassword) {
    return true;
  }
};

export default mongoose.model("User", userSchema);
