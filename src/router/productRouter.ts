import { Router } from 'express';
import ProductsController from '../controllers/ProductController';
import auth from '../middleware/auth';

const productsController = new ProductsController();
const productsRouter = Router();

productsRouter.post('/', auth, productsController.create);
productsRouter.get('/', auth, productsController.getAll);
productsRouter.delete('/:id', auth, productsController.remove);
productsRouter.put('/:id', auth, productsController.update);

export default productsRouter;