import { Router } from 'express';
import UserController from '../controllers/UserController';
// import auth from '../middleware/auth';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);

export default userRouter;