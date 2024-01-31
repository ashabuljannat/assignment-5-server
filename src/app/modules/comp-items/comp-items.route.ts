/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.interface';
import { CompItemControllers } from './comp-items.controller';

const router = express.Router();

router.get('/', CompItemControllers.getAllCompItem);

router.delete('/', CompItemControllers.deleteCompItem);
// router.delete(
//   '/:itemId',
//   CompItemControllers.deleteCompItem,
// );

router.post('/', CompItemControllers.createCompItem);

router.post('/:itemId', CompItemControllers.copyCreateCompItem);

router.put('/:itemId', CompItemControllers.updateCompItem);

// router.get('/', CompItemControllers.getAllCategories);

// router.post(
//   '/',
//   auth(USER_ROLE.admin),
//   validateRequest(CategoryValidations.categoryValidationSchema),
//   CompItemControllers.createCategory,
// );

export const CompItemRoutes = router;
