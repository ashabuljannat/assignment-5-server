/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: any,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

