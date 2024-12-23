import jwt, { JwtPayload } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: JwtPayload,
  token: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, token, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
