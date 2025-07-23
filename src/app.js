import express, { json, urlencoded } from 'express';
import  setRoutes  from './routes/index.js';
import dotenv from 'dotenv';
import authRoutes from './auth/login.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/auth', authRoutes);
app.use(urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(errorHandler);
