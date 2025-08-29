import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from './routes/auth.js';
import connectDB from './config/db.js';

dotenv.config({
    path:"/"
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors({

}))

// Routes
app.use('/api', authRoutes);


// Connect to MongoDB
await connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
