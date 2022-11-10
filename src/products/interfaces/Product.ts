import { Document } from 'mongoose';

export interface Product extends Document {
  _id?: number;
  category: string;
  brand: string;
  slug: string;
  status: string;
}
