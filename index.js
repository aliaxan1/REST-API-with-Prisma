import express, { query, urlencoded } from 'express';
import userRouter from './routes/Routes.js';



//Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // for parsing application/json

// If you're dealing with URL-encoded data, use the following line
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded





app.use('/student/api', userRouter);

//Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})