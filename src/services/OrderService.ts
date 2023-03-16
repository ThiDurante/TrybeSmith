import Joi from 'joi';
import IOrder from '../interfaces/orderInterface';
import IUser from '../interfaces/userInterface';
import connection from '../models/connection';
import OrderModel from '../models/OrderModel';
import UserModel from '../models/UserModel';

const orderSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).required()
    .label('productsIds')
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
  userId: Joi.number(),
});

class OrderService {
  private orderModel: OrderModel;

  private userModel: UserModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.userModel = new UserModel(connection);
  }

  public async create(order: IOrder & IUser): Promise<IOrder | string> {
    // needs to fetch userId on DB, mount a new object and pass it to create on model
    const user = await this.userModel.getByUsername(order.username);
    const newOrder = {
      productsIds: order.productsIds,
      userId: user.id as number,
    };
    // also needs to validate productsIds 
    const { error } = orderSchema.validate(newOrder);
    
    if (error) return error.details[0].message;

    const createdOrder = await this.orderModel.create(newOrder);
    return createdOrder;
  } 

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.orderModel.getAll();
    return orders;
  }
}

export default OrderService;