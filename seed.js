// seed.js
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {
  const hashed = await bcrypt.hash('yourpassword123', 10);

  await prisma.user.create({
    data: {
      firstName: 'Test',
      email: 'test@example.com',
      password: hashed,
    },
  });

  console.log('User seeded!');
  process.exit();
};

seed();
