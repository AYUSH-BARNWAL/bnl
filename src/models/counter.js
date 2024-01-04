import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  variableName: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

export default Counter;
