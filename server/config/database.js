import mongoose from "mongoose";

export async function connectToDb() {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once("connected", () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
  });
}
