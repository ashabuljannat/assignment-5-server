"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const sales_controller_1 = require("./sales.controller");
const router = express_1.default.Router();
router.get('/', sales_controller_1.SalesControllers.getAllSales);
router.post('/', sales_controller_1.SalesControllers.createSales);
router.delete('/:salesId', sales_controller_1.SalesControllers.deleteSales);
exports.SalesRoutes = router;
