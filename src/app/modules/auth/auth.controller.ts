/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  // console.log(10,req.body);
  const user: any = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {   
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt, 
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  // console.log(10,req.body,req.user);
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successfully!',
    data: {
      user: {
        _id: user._id,
        username: user.username
      },
      token: accessToken,
    },
  });
});


export const AuthControllers = {
  registerUser,
  loginUser
};
