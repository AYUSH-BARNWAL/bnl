import mongoose from "mongoose";

const bankAccountmodel = new mongoose.Schema({
  accountopeningdate: {
    type: Date,
    required: true,
  },
  bankname: {
    type: String,
    required: true,
  },
  accountnumber: {
    type: Number,
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
  mongoose.model("BankAccount", bankAccountmodel);
export default BankAccount;
