import jsonwebtoken from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export const encode = (id: string, email: string) => jsonwebtoken.sign({
  id,
  email,
}, process.env.JWT_SECRET);

export const decode = () => expressJwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});
