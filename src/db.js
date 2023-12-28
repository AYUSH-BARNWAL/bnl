import mongoose from "mongoose";

const { MONGO_URI } = process.env;

export default async function connect() {
  mongoose.connect(MONGO_URI, {}).then(
    () => {
      console.log("MongoDB connected");
    },
    () => {
      console.log("Error connecting to MongoDB");
    }
  );
}
