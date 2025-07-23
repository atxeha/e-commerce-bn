import express, { json, urlencoded } from 'express';
import  setRoutes  from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});