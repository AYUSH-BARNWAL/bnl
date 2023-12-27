import mongoose from "mongoose";

const promoterShareSchema = new mongoose.Schema({
  promoterId: String,
  promoterName: String,
  sharesLeft: Number,
});

const PromoterShare =
  mongoose.models.PromoterShare ||
  mongoose.model("PromoterShare", promoterShareSchema);

export default PromoterShare;
