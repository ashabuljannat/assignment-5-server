"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const mongoose_1 = require("mongoose");
const salesSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Sales = (0, mongoose_1.model)('Sale', salesSchema);
