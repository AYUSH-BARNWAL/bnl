import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionNumber: String,
  transactionType: String, // credit/debit/share,
  transactionDate: Date,
  amount: Number,
  membershipNumber: Number,
  customerAccountNumber: String,
  paymode: String, // cash/cheque/online,
  bank_id: String, // for cheque/online transaction
  balance: Number, // new balance
  particular: String,
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
