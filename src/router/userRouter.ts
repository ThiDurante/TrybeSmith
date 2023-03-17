import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', auth, userController.getAll);
userRouter.post('/', auth, userController.create);

export default userRouter;