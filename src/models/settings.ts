import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  displayName: string;
  bio: string;
  avatar: string;
  themeId: string;
  socialLinks: {
    facebook: string;
    tiktok: string;
    instagram: string;
    youtube: string;
    zalo: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    displayName: { type: String, default: "Your Name" },
    bio: { type: String, default: "Chia sẻ những sản phẩm tốt nhất" },
    avatar: { type: String, default: "" },
    themeId: { type: String, default: "rose" },
    socialLinks: {
      facebook: { type: String, default: "" },
      tiktok: { type: String, default: "" },
      instagram: { type: String, default: "" },
      youtube: { type: String, default: "" },
      zalo: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
