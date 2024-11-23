import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
//Show log for request type and status
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5100;

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req,res)=>{
    res.status(404).json({message: "Page not found"})
})
// Should be last one
app.use(errorHandlerMiddleware);

try {
    await mongoose.connect(process.env.MONGO_URL);
    // Listen to server
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`);
    })

} catch (error) {
    console.log(error);
    process.exit(1);
}