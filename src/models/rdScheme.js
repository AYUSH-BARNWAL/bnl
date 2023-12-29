import mongoose from "mongoose";

const rdSchemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
  },
  schemeCode: {
    type: String,
    required: true,
  },
  minimumRdAmt: {
    type: Number,
    required: true,
  },
  rdFreq: {
    type: String,
    required: true,
  },
  lockInPeriod: {
    type: Number,
    required: true,
  },
  annualInterestRate: {
    type: Number,
    required: true,
  },
  interestCompoundInterval: {
    type: String,
    required: true,
  },
  tenureRdMonth: {
    type: Number,
    required: true,
  },
  cancelCharges: {
    type: Number,
    required: true,
  },
  otherCharges: {
    type: Number,
    required: true,
  },
  active: {
    type: "String",
    default: "yes",
  },
});

const RdScheme =
  mongoose.models.RdScheme || mongoose.model("RdScheme", rdSchemeSchema);
export default RdScheme;
