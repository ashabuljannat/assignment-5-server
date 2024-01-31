/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { SalesServices } from './sales.service';

const createSales = catchAsync(async (req, res) => {
  //   const token = req.headers.authorization;
  //   const decoded = jwt.verify(
  //     token as string,
  //     config.jwt_access_secret as string,
  //   ) as JwtPayload;
  //   // console.log(req.body)
  //   // console.log(decoded._id)

  const result = await SalesServices.createSalesIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Sales created successfully',
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const { meta, result } = await SalesServices.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales retrieved successfully',
    meta,
    data: result,
  });
});

const deleteSales = catchAsync(async (req, res) => {
  const { salesId } = req.params;

  const result = await SalesServices.deleteSalesFromDB(salesId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sales deleted successfully',
    data: result,
  });
});

export const SalesControllers = {
  createSales,
  getAllSales,
  deleteSales,
};
