import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connection.on("connected", () => {
      // console.log("Connected to MongoDB");
    });
    connection.on("error", () => {
      console.log("dbConfig me dikkat hai.");
      console.log(error);
      process.exit(1);
    });
  } catch (err) {
    console.log("dbConfig me dikkat hai.");
    console.log(err);
  }
  console.log("Connected to MongoDB");
}
