"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompItemRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const comp_items_controller_1 = require("./comp-items.controller");
const router = express_1.default.Router();
router.get('/', comp_items_controller_1.CompItemControllers.getAllCompItem);
router.delete('/', comp_items_controller_1.CompItemControllers.deleteCompItem);
// router.delete(
//   '/:itemId',
//   CompItemControllers.deleteCompItem,
// );
router.post('/', comp_items_controller_1.CompItemControllers.createCompItem);
router.post('/:itemId', comp_items_controller_1.CompItemControllers.copyCreateCompItem);
router.put('/:itemId', comp_items_controller_1.CompItemControllers.updateCompItem);
// router.get('/', CompItemControllers.getAllCategories);
// router.post(
//   '/',
//   auth(USER_ROLE.admin),
//   validateRequest(CategoryValidations.categoryValidationSchema),
//   CompItemControllers.createCategory,
// );
exports.CompItemRoutes = router;
