import jwt, { SignOptions } from 'jsonwebtoken';

const secretOrPrivateKey = process.env.JWT_SECRET_KEY || 'your-secret';

export const generateToken = (payload: string | object | Buffer, expiresIn: string | number = '1h'): string => {
  const issuer = 'portfolio-ws';
  const options: SignOptions = {
    expiresIn: expiresIn as any,
    issuer,
  };

  return jwt.sign(payload, secretOrPrivateKey, options);
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
      if (err) {
        reject('Failed to authenticate token.');
      } else {
        resolve(decoded);
      }
    });
  });
};
