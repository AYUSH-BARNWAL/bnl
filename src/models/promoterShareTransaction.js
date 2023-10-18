import mongoose from "mongoose";

const PromoterShareTransactionSchema = new mongoose.Schema({
  promoterName: {
    type: String,
    required: true,
  },
  sharesLeft: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  membershipNumber: {
    type: Number,
    required: true,
  },
  sharesSold: {
    type: Number,
    required: true,
  },
});

const PromoterShareTransaction =
  mongoose.models.PromoterShareTransaction ||
  mongoose.model("PromoterShareTransaction", PromoterShareTransactionSchema);
export default PromoterShareTransaction;
