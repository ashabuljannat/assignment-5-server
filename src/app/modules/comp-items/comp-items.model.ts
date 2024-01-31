import { Schema, model } from 'mongoose';
import { TComputerItem } from './comp-items.interface';

const compItemSchema = new Schema<TComputerItem>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    compatibility: {
      type: [String],
      required: true,
    },
    interface: {
      type: [String],
      default: null,
    },
    condition: {
      role: {
        type: String,
        enum: {
          values: ['new', 'used'],
        },
      },
      // required: true,
    },
    capacity: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CompItem = model<TComputerItem>('Computer-Item', compItemSchema);
