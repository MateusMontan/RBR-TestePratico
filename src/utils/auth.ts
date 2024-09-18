import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, username: string) => {
  const secretKey = process.env.JWT_SECRET as string;
  
  const token = jwt.sign(
    { id: userId, username: username },
    secretKey,
    { expiresIn: '1h' }
  );

  return token;
};
