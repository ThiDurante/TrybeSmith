import { Router } from 'express';
import ProductsController from '../controllers/ProductController';
// import auth from '../middleware/auth';

const productsController = new ProductsController();
const productsRouter = Router();

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.getAll);
productsRouter.delete('/:id', productsController.remove);
productsRouter.put('/:id', productsController.update);

export default productsRouter;