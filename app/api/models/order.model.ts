import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  products: [ { type: mongoose.Schema.Types.ObjectId, ref: "Products", }, ],
  total: { type: Number, required: true, },
  createdAt: { type: Date, default: Date.now, },
});

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema);
