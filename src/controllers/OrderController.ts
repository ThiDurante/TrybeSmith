import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import setStatus from '../utils/setStatus';

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public create = async (req: Request, res: Response) => {
    const order = req.body;
    
    const newOrderCreated = await this.orderService.create(order);
    
    if (typeof newOrderCreated === 'string') {
      const status = setStatus(newOrderCreated);
      return res.status(status)
        .json({ message: newOrderCreated });
    } 
    return res.status(201).json(newOrderCreated);
  };

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(200).json(orders);
  };
}

export default OrderController;