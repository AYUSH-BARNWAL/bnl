import mongoose from "mongoose";

const fdSchemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
  },
  schemeCode: {
    type: String,
    required: true,
  },
  minimumFdAmt: {
    type: Number,
    required: true,
  },
  fdLockInPeriod: {
    type: Number,
    required: true,
  },
  annualInterestRate: {
    type: Number,
    required: true,
  },
  interestPayoutCycle: {
    type: String,
    required: true,
  },
  fdTenure: {
    type: Number,
    required: true,
  },
  cancelCharges: {
    type: Number,
    required: true,
  },
  active: {
    type: String,
    default: true,
  },
  otherCharges: {
    type: Number,
    default: 0,
  },
});

const FdScheme =
  mongoose.models.FdScheme || mongoose.model("FdScheme", fdSchemeSchema);
export default FdScheme;
