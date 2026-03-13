import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  affiliateUrl: string;
  price: number;
  showPrice: boolean;
  category: string;
  isActive: boolean;
  clicks: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, required: true },
    affiliateUrl: { type: String, required: true },
    price: { type: Number, default: 0 },
    showPrice: { type: Boolean, default: false },
    category: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    clicks: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
