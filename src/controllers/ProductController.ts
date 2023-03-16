import { Request, Response } from 'express';
import ProductsService from '../services/ProductService';
import setStatus from '../utils/setStatus';

class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public create = async (req: Request, res: Response) => {
    const productToCreate = req.body;
    const createdProduct = await this.productsService.create(productToCreate);
    if (typeof createdProduct === 'string') {
      const status = setStatus(createdProduct);
      return res.status(status).json({ message: createdProduct });
    } 
    return res.status(201).json(createdProduct); 
  };

  public getAll = async (req: Request, res: Response) => {
    const result = await this.productsService.getAll();
    return res.status(200).json(result);
  };
}

export default ProductsController;