import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import auth from '../middleware/auth';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', auth, orderController.create);

export default orderRouter;