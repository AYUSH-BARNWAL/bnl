import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  accountopeningdate: {
    type: Date,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const BankAccount =
  mongoose.models.BankAccount ||
  mongoose.model("BankAccount", bankAccountSchema);
export default BankAccount;
