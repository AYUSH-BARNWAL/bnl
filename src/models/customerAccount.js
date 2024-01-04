import mongoose from "mongoose";

const customerAccountSchema = new mongoose.Schema({
  membershipNumber: {
    type: String,
    required: true,
  },
  memberName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  schemeCode: {
    type: String,
    required: true,
  },
  openingDate: {
    type: Date,
    required: true,
  },
  typeOfAccount: {
    type: String,
    required: true,
  },
  nominee: {
    type: String,
    required: true,
  },
  balance: Number,
  customerAccountNumber: {
    type: String,
    required: true,
  },
});

const CustomerAccount =
  mongoose.models.CustomerAccount ||
  mongoose.model("CustomerAccount", customerAccountSchema);

export default CustomerAccount;
