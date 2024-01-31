import { Schema, model } from 'mongoose';
import { TCategory } from './categories.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export const Category = model<TCategory>('Category', categorySchema);
