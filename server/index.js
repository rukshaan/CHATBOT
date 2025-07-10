import express from 'express';
import mongoose from 'mongoose';   
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoutes.js';

dotenv.config();
const app=express();
const Port=process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/chat-app';

app.use(cors({
    origin: 'http://localhost:5173',
    // origin: [process.env.ORIGIN ], // Adjust the origin as needed
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods : ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));
const server=app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes)
mongoose
.connect(databaseUrl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});