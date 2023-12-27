import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema({
  accountopeningdate: {
    type: Date,
    required: true,
  },
  bankname: {
    type: String,
    required: true,
  },
  accountnumber: {
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
  accounttype: {
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
