import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Expect Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Attach decoded token payload to request object
    next();
  });
}
