/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { CompServices } from './comp-items.service';

const createCompItem = catchAsync(async (req, res) => {
  //   const token = req.headers.authorization;
  //   const decoded = jwt.verify(
  //     token as string,
  //     config.jwt_access_secret as string,
  //   ) as JwtPayload;
  //   // console.log(req.body)
  //   // console.log(decoded._id)

  const result = await CompServices.createCompItemIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Computer item created successfully',
    data: result,
  });
});

const copyCreateCompItem = catchAsync(async (req, res) => {
  const result = await CompServices.createCompItemIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Computer item Duplicate created successfully',
    data: result,
  });
});

const getAllCompItem = catchAsync(async (req, res) => {
  const { meta, result } = await CompServices.getAllCompItemFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Computer item retrieved successfully',
    meta,
    data: result,
  });
});

const updateCompItem = catchAsync(async (req, res) => {
  const { itemId } = req.params;
  const result = await CompServices.updateCompItemIntoDB(itemId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Computer item updated successfully',
    data: result,
  });
});

const deleteCompItem = catchAsync(async (req, res) => {
  // const { itemId } = req.params;
  const itemsAllId = req.body.itemsAllId;

  // const result = await CompServices.deleteCompItemFromDB(itemId, itemsAllId);
  const result = await CompServices.deleteCompItemFromDB(itemsAllId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Computer ${
      result.deletedCount > 1 ? 'items' : 'item'
    } deleted successfully`,
    data: result,
  });
});

export const CompItemControllers = {
  createCompItem,
  copyCreateCompItem,
  getAllCompItem,
  updateCompItem,
  deleteCompItem,
};
