import mongoose from "mongoose";

const saSchemeSchema = new mongoose.Schema({
  schemeName: {
    type: String,
    required: true,
  },
  schemeCode: {
    type: String,
    required: true,
  },
  minimumBalance: {
    type: Number,
    required: true,
  },
  annualInterestRate: {
    type: Number,
    required: true,
  },
  interestPayout: {
    type: String,
    required: true,
  },
  serviceChargeFreq: {
    type: String,
    required: true,
  },
  serviceCharge: {
    type: Number,
    required: true,
  },
  smsChargeFreq: {
    type: String,
    required: true,
  },
  smsCharge: {
    type: Number,
    required: true,
  },
});

const SaScheme =
  mongoose.models.SaScheme || mongoose.model("SaScheme", saSchemeSchema);
export default SaScheme;
