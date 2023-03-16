import { Router } from 'express';
import ProductsController from '../controllers/ProductController';
// import auth from '../middleware/auth';

const productsController = new ProductsController();
const productsRouter = Router();

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.getAll);

export default productsRouter;