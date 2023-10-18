import mongoose from "mongoose";

const PromoterSchema = new mongoose.Schema({
  gender: {
    type: String,
    // default: "male",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
  },
  pan: {
    type: String,
    required: true,
  },
  voter: {
    type: String,
  },
  ration: {
    type: Number,
  },
  martial: {
    type: String,
    // default: "unmarried",
    required: true,
  },
  area: {
    type: String,
  },
  Landmark: {
    type: String,
  },
  post: {
    type: String,
  },
  dist: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  spouse: {
    type: String,
    default: "",
  },
  allotmentDate: {
    type: Date,
    required: true,
  },
  firstDistinctionNumber: {
    type: Number,
    required: true,
  },
  lastDistinctionNumber: {
    type: Number,
    required: true,
  },
  totalShareValue: {
    type: Number,
    required: true,
  },
  shareNominalHold: {
    type: Number,
    required: true,
  },
  shareNominalValue: {
    type: Number,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: Number,
    required: true,
  },
});
const Promoter =
  mongoose.models.Promoter || mongoose.model("Promoter", PromoterSchema);
export default Promoter;
