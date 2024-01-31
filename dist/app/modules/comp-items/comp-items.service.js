"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const comp_item_utils_1 = require("./comp-item.utils");
const comp_items_model_1 = require("./comp-items.model");
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const createCompItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comp_items_model_1.CompItem.create(payload);
    return result;
});
const getAllCompItemFromDB = (reqQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, reqQuery);
    comp_item_utils_1.compItemExcludeFilteringFields.forEach((el) => delete queryObj[el]);
    const queryPage = Number(reqQuery.page) || 1;
    const queryLimit = Number(reqQuery.limit) || 10;
    const { sortBy, sortOrder } = reqQuery;
    const sort = {};
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }
    const { maxPrice: queryMaxPrice, minPrice: queryMinPrice } = reqQuery;
    if (queryMaxPrice || queryMinPrice) {
        const queryResult = yield comp_items_model_1.CompItem.find({
            $and: [
                { price: { $gte: queryMinPrice } },
                { price: { $lte: queryMaxPrice } },
            ],
        }).sort(sort);
        const { allPageData, totalPages } = (0, comp_item_utils_1.pagination)(queryResult, queryLimit);
        const meta = {
            page: totalPages,
            limit: queryLimit,
            total: queryResult.length,
        };
        const result = allPageData[queryPage - 1];
        return { meta, result };
    }
    const queryResult = yield comp_items_model_1.CompItem.find(queryObj).sort(sort);
    const { allPageData, totalPages } = (0, comp_item_utils_1.pagination)(queryResult, queryLimit);
    const meta = {
        page: totalPages,
        limit: queryLimit,
        total: queryResult.length,
    };
    const result = allPageData[queryPage - 1];
    return { meta, result };
});
// const deleteCompItemFromDB = async (id: string, ids: string[]) => {
const deleteCompItemFromDB = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    // if ((await CompItem.find({ _id: id })).length < 1) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Computer item not found');
    // }
    const result = yield comp_items_model_1.CompItem.deleteMany({
        _id: { $in: ids === null || ids === void 0 ? void 0 : ids.map((id) => new mongoose_1.Types.ObjectId(id)) },
    });
    // const result = await CompItem.findByIdAndDelete(id);
    return result;
});
const updateCompItemIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isItemExist = yield comp_items_model_1.CompItem.findOne({ _id: id });
    if (!isItemExist) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Computer Item not found');
    }
    const { compatibility, interface: interfaceItem } = payload, itemRemainingData = __rest(payload, ["compatibility", "interface"]);
    try {
        const updatedBasicItemInfo = yield comp_items_model_1.CompItem.findByIdAndUpdate(id, itemRemainingData, { new: true, runValidators: true });
        if (!updatedBasicItemInfo) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to update Computer Item');
        }
        if (compatibility && compatibility.length > 0) {
            const updateCompatibility = yield comp_items_model_1.CompItem.findByIdAndUpdate(id, { $set: { compatibility } }, { new: true, runValidators: true });
            if (!updateCompatibility) {
                throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to update computer item');
            }
        }
        if (interfaceItem && interfaceItem.length > 0) {
            const updateInterface = yield comp_items_model_1.CompItem.findByIdAndUpdate(id, { $set: { interface: interfaceItem } }, { new: true, runValidators: true });
            if (!updateInterface) {
                throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to update computer item');
            }
        }
        const result = yield comp_items_model_1.CompItem.findById(id);
        return result;
    }
    catch (err) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Catch Failed to update course');
    }
});
exports.CompServices = {
    createCompItemIntoDB,
    getAllCompItemFromDB,
    deleteCompItemFromDB,
    updateCompItemIntoDB,
};
