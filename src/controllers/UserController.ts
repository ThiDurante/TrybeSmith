import { Request, Response } from 'express';
import UserService from '../services/UserService';
import generateToken from '../utils/tokenGenerator';
import setStatus from '../utils/setStatus';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const error = await this.userService.create(user);
    if (typeof error === 'string') {
      const status = setStatus(error);
      return res.status(status).json({ message: error });
    } 
    const token = generateToken(user);
    return res.status(201).json({ token });
  };

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    return res.status(200).json(users);
  };

  public login = async (req: Request, res: Response) => {
    const userToLogin = req.body;
    if (!userToLogin.username) {
      return res.status(400).json({ message: '"username" is required' });
    }
    if (!userToLogin.password) {
      return res.status(400).json({ message: '"password" is required' });
    }
    const getUser = await this.userService.getByUsername(userToLogin.username);
    if (!getUser) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    if (getUser.password === userToLogin.password) {
      const token = generateToken(userToLogin);
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Username or password invalid' });
  };
}

export default UserController;