
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../prisma_/client.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/user-login', async (req, res) => {
  const { email, password } = req.body;

  console

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required.' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Issue JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
});

export default router;
