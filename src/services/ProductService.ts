import Joi from 'joi';
import IProduct from '../interfaces/productInterface';
import connection from '../models/connection';
import ProductsModel from '../models/ProductModel';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

class ProductsService {
  private productsModel: ProductsModel;

  constructor() {
    this.productsModel = new ProductsModel(connection);
  }

  public async create(product: IProduct): Promise<string | IProduct> {
    const { error } = productSchema.validate(product);
    if (error) return error.details[0].message;
    const createdProduct = await this.productsModel.create(product);
    return createdProduct;
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.productsModel.getAll();
    return products;
  }

  public async remove(id:number): Promise<void> {
    await this.productsModel.remove(id);
  }

  public async update(product: IProduct, id: number): Promise<string | IProduct> {
    const { error } = productSchema.validate(product);
    if (error) return error.details[0].message;
    const productExists = await this.productsModel.getById(id);
    if (!productExists) return 'This product does not exist';
    const updated = this.productsModel.update(product, id);
    return updated;
  }
}

export default ProductsService;