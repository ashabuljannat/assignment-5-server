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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../errors/AppError");
const sales_model_1 = require("./sales.model");
const comp_item_utils_1 = require("../comp-items/comp-item.utils");
const createSalesIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.create(payload);
    return result;
});
const getAllSalesFromDB = (reqQuery) => __awaiter(void 0, void 0, void 0, function* () {
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
        const queryResult = yield sales_model_1.Sales.find({
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
    const queryResult = yield sales_model_1.Sales.find(queryObj).sort(sort);
    const { allPageData, totalPages } = (0, comp_item_utils_1.pagination)(queryResult, queryLimit);
    const meta = {
        page: totalPages,
        limit: queryLimit,
        total: queryResult.length,
    };
    const result = allPageData[queryPage - 1];
    return { meta, result };
});
const deleteSalesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield sales_model_1.Sales.find({ _id: id })).length < 1) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Sales not found');
    }
    const result = yield sales_model_1.Sales.findByIdAndDelete(id);
    return result;
});
exports.SalesServices = {
    createSalesIntoDB,
    getAllSalesFromDB,
    deleteSalesFromDB,
};
