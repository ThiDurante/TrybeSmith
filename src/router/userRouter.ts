import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', auth, userController.getAll);
userRouter.post('/', userController.create);
userRouter.delete('/:id', auth, userController.remove);
userRouter.put('/:id', auth, userController.update);

export default userRouter;