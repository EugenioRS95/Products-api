import { Schema } from 'mongoose';

export const BrandSchema = new Schema({
  name: String,
  slug: String,
});
