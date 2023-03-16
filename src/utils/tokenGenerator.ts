import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import IUser from '../interfaces/userInterface';

const secret = config.JWT_SECRET;

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const generateToken = (payload: IUser) => jwt.sign(payload, secret, jwtConfig);

export default generateToken;