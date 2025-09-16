import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  brand: { type: String },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
