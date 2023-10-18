import mongoose from "mongoose";

const chequeOnlineModel = new mongoose.Schema({
  transactionType: {
    type: String,
    default: "Deposit",
  },
  accountType: {
    type: String,
    default: "Saving",
  },
  bankAccountNumber: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
  transactionDate: {
    type: String,
    default: new Date(),
  },
  payMode: {
    type: String,
    default: "Online Transaction",
  },
  balance: {
    type: Number,
  },
  bankName: {
    type: String,
  },
  particular: {
    type: String,
  },
  shareAmount: {
    type: Number,
    default: 0,
  },
  membershipAmount: {
    type: Number,
    default: 0,
  },
  membershipNumber: {
    type: Number,
    default: 0,
  },
  ifsc: {
    type: String,
  },
});

const ChequeOnline =
  mongoose.models.ChequeOnline ||
  mongoose.model("ChequeOnline", chequeOnlineModel);
export default ChequeOnline;
