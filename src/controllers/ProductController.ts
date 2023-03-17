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

  public remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.productsService.remove(Number(id));
    return res.status(204).json({ message: `Product ${id} deleted from Database` });
  };

  public update = async (req: Request, res: Response) => {
    const updatedProduct = req.body;
    const { id } = req.params;
    const updated = await this.productsService.update(updatedProduct, Number(id));
    if (typeof updated === 'string') {
      const status = setStatus(updated);
      return res.status(status).json({ message: updated });
    }
    return res.status(202).json(updated);
  };
}

export default ProductsController;