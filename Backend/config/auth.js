import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = process.env.JWT_EXPIRES_IN;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwt_secret, {
    expiresIn: jwt_expires_in 
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwt_secret);
  } catch (error) {
    return null;
  }
};

export {
  jwt_secret,
  generateToken,
  verifyToken
};