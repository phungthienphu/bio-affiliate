import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClick extends Document {
  productId: mongoose.Types.ObjectId;
  ip: string;
  userAgent: string;
  referer: string;
  createdAt: Date;
}

const ClickSchema = new Schema<IClick>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    referer: { type: String, default: "" },
  },
  { timestamps: true }
);

const Click: Model<IClick> =
  mongoose.models.Click || mongoose.model<IClick>("Click", ClickSchema);

export default Click;
