import express, { urlencoded } from 'express';
import  setRoutes  from './routes/index.js';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); 
app.use(express.json());

app.use(urlencoded({ extended: true }));

// Routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(errorHandler);
