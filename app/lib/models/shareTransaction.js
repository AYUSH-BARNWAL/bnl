import mongoose from "mongoose";

const shareTransactionSchema = new mongoose.Schema({
  promoterId: {
    type: String,
    required: true,
  },
  promoterName: {
    type: String,
    required: true,
  },
  membershipNumber: {
    type: String,
    default: 0,
    required: true,
  },
  sharesSold: {
    type: Number,
    required: true,
  },
  shareValue: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  tNumber: {
    type: String,
    required: true,
  },
});

const ShareTransaction =
  mongoose.models.ShareTransaction ||
  mongoose.model("ShareTransaction", shareTransactionSchema);

export default ShareTransaction;
