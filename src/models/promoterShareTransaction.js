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
    type: String,
    required: true,
    default: new Date().toString(),
  },

  membershipNumber: {
    type: Number,
    required: true,
    default: 0,
  },
  sharesSold: {
    type: Number,
    required: true,
    default: 0,
  },
  transactionID: {
    type: String,
    required: true,
  },
});

const PromoterShareTransaction =
  mongoose.models.PromoterShareTransaction ||
  mongoose.model("PromoterShareTransaction", PromoterShareTransactionSchema);
export default PromoterShareTransaction;
