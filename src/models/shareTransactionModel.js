import mongoose from "mongoose";

const shareTransactionSchema = new mongoose.Schema({
  shareName: {
    type: String,
    required: true,
  },
  shareCode: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ShareTransaction =
  mongoose.models.ShareTransaction ||
  mongoose.model("ShareTransaction", shareTransactionSchema);
export default ShareTransaction;
