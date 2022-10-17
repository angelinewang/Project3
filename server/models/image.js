import mongoose from "mongoose";

var imageSchema = new mongoose.Schema(
  String
  // name: String,
  // desc: String,
  // img: {
  //   data: Buffer,
  //   contentType: String,
  // },
);

//Image is a model which has a schema imageSchema

export default mongoose.model("Image", imageSchema);
