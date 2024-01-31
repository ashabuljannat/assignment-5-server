/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser, TRegUser } from './auth.interface';
import { createToken } from './auth.utils';

const registerUser = async (payload: TRegUser) => {
  // console.log(payload)
  const result = await User.create(payload);
  // console.log(result)
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  // const user = await User.isUserExistsByUserName(payload.username);
  const user: any = await User.findOne({
    username: payload.username,
  }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client
  const jwtPayload = {
    _id: user._id,
    username: user.username
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
    user,
  };
};


export const AuthServices = {
  registerUser,
  loginUser
};
