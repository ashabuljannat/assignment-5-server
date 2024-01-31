"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompItem = void 0;
const mongoose_1 = require("mongoose");
const compItemSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.CompItem = (0, mongoose_1.model)('Computer-Item', compItemSchema);
