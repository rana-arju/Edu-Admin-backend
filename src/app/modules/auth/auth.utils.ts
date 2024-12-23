import Jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: JwtPayload,
  token: string,
  expiresIn: string,
) => {
  return Jwt.sign(jwtPayload, token, {
    expiresIn: expiresIn,
  });
};
