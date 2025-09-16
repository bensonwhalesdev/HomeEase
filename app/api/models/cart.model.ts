import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
  total: number;
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const cartModel = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default cartModel;
