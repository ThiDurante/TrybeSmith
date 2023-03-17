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

    const userNameExists = await this.userModel.getByUsername(user.username);
    if (userNameExists) return 'This username is already taken';

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

  public async remove(id:number): Promise<void> {
    await this.userModel.remove(id);
  }

  public async update(user: IUser, id: number): Promise<string | IUser> {
    const { error } = userSchema.validate(user);
    if (error) return error.details[0].message;
    
    const userExists = await this.userModel.getById(id);
    if (userExists.length < 1) {
      return 'This user does not exist';
    }
      
    const updated = this.userModel.update(user, id);
    return updated;
  }
}

export default UserService;