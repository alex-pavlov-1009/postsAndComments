import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JwtAuthError } from '../../error/jwt.error';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new JwtAuthError();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new JwtAuthError();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw new JwtAuthError();
  }

  if (!decodedToken) {
    throw new JwtAuthError();
  }

  req.user = decodedToken;
  next();
};
