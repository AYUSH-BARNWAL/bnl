import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  membershipCharge: {
    type: Number,
  },
  membershipNumber: {
    type: Number,
  },
});

const Membership =
  mongoose.models.Membership || mongoose.model("Membership", membershipSchema);
export default Membership;
