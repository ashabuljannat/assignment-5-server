import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    saleBy: {
      type: String
    },
  },
  {
    timestamps: true,
  },
);

export const Sales = model<TSales>('Sale', salesSchema);
