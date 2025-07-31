import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import prisma from '../prisma_/client.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName: name,
          provider: 'google',
          externalId: sub,
        }
      });
    }

    // Issue JWT
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json({ accessToken });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Google login failed', error: error.message });
  }
});

export default router;
