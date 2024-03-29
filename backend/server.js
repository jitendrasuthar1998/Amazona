import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';


dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/amazona',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);

app.use('/api/products',productRouter);

app.use('/api/orders', orderRouter);

app.use('/api/config/paypal', (req, res) =>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/uploads', uploadRouter);

const __dirname = path.resolve();

app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res)=>
{
  res.send('Server is ready.');
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Serve at http://localhost:${port}`)
});