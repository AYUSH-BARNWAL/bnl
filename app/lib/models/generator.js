import mongoose from "mongoose";

const generatorSchema = new mongoose.Schema({
  membershipNumber: {
    type: Number,
    default: 0,
  },
});

const Generator =
  mongoose.models.Generator || mongoose.model("Generator", generatorSchema);

export default Generator;
