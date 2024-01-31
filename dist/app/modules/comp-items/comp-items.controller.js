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
exports.CompItemControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const comp_items_service_1 = require("./comp-items.service");
const createCompItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const token = req.headers.authorization;
    //   const decoded = jwt.verify(
    //     token as string,
    //     config.jwt_access_secret as string,
    //   ) as JwtPayload;
    //   // console.log(req.body)
    //   // console.log(decoded._id)
    const result = yield comp_items_service_1.CompServices.createCompItemIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Computer item created successfully',
        data: result,
    });
}));
const copyCreateCompItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comp_items_service_1.CompServices.createCompItemIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Computer item Duplicate created successfully',
        data: result,
    });
}));
const getAllCompItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, result } = yield comp_items_service_1.CompServices.getAllCompItemFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Computer item retrieved successfully',
        meta,
        data: result,
    });
}));
const updateCompItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const result = yield comp_items_service_1.CompServices.updateCompItemIntoDB(itemId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Computer item updated successfully',
        data: result,
    });
}));
const deleteCompItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { itemId } = req.params;
    const itemsAllId = req.body.itemsAllId;
    // const result = await CompServices.deleteCompItemFromDB(itemId, itemsAllId);
    const result = yield comp_items_service_1.CompServices.deleteCompItemFromDB(itemsAllId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Computer ${result.deletedCount > 1 ? 'items' : 'item'} deleted successfully`,
        data: result,
    });
}));
exports.CompItemControllers = {
    createCompItem,
    copyCreateCompItem,
    getAllCompItem,
    updateCompItem,
    deleteCompItem,
};
