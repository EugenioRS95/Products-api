import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    default: null,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Marca',
    default: null,
  },
  slug: String,
  status: String,
});
