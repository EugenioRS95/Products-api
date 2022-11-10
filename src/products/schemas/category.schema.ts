import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
  name: String,
  slug: String,
});
