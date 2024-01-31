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
exports.SalesControllers = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const sales_service_1 = require("./sales.service");
const createSales = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const token = req.headers.authorization;
    //   const decoded = jwt.verify(
    //     token as string,
    //     config.jwt_access_secret as string,
    //   ) as JwtPayload;
    //   // console.log(req.body)
    //   // console.log(decoded._id)
    const result = yield sales_service_1.SalesServices.createSalesIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Sales created successfully',
        data: result,
    });
}));
const getAllSales = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meta, result } = yield sales_service_1.SalesServices.getAllSalesFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Sales retrieved successfully',
        meta,
        data: result,
    });
}));
const deleteSales = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { salesId } = req.params;
    const result = yield sales_service_1.SalesServices.deleteSalesFromDB(salesId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Sales deleted successfully',
        data: result,
    });
}));
exports.SalesControllers = {
    createSales,
    getAllSales,
    deleteSales,
};
