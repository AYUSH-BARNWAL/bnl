import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  membershipCharge: {
    type: Number,
  },
  // balance: {
  //   type: Number,
  //   default: 0,
  // },
  membershipNumber: {
    type: Number,
  },
});

const Membership =
  mongoose.models.Membership || mongoose.model("Membership", membershipSchema);
export default Membership;
