/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.interface';
import { SalesControllers } from './sales.controller';

const router = express.Router();

router.get('/', SalesControllers.getAllSales);

router.post('/', SalesControllers.createSales);

router.delete('/:salesId', SalesControllers.deleteSales);

export const SalesRoutes = router;

