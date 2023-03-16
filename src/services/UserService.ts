import Joi from 'joi';
import IUser from '../interfaces/userInterface';
import connection from '../models/connection';
import UserModel from '../models/UserModel';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  vocation: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  level: Joi.number().min(1).required(),
});

class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(user: IUser): Promise<string | IUser> {
    const { error } = userSchema.validate(user);
    if (error) return error.details[0].message;
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userModel.getAll();
    return users;
  }

  public async getByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.getByUsername(username);
    return user;
  }
}

export default UserService;