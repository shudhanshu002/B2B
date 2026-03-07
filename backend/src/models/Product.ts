import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  subCategory: { type: String },
  seoTags: [String],
  sustainabilityFilters: [String],
  aiGeneratedAt: { type: Date, default: Date.now }
});

export const Product = model('Product', ProductSchema);