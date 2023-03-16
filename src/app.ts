import express from 'express';
import UserController from './controllers/UserController';
import orderRouter from './router/orderRouter';
import productsRouter from './router/productRouter';
import userRouter from './router/userRouter';

const app = express();
const userController = new UserController();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.post('/login', userController.login);

export default app;
