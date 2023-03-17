import { Pool } from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import dotenv from 'dotenv';
import IProduct from '../interfaces/productInterface';

dotenv.config();
type Product = Omit <IProduct, 'id'>;

class ProductsModel {
  // public connection
  constructor(readonly connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<IProduct> {
    const query = 'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)';
    const [{ insertId }] = await this.connection
      .execute<ResultSetHeader>(query, [product.name, product.amount]);
    return { ...product, id: insertId };
  }

  public async getAll(): Promise<IProduct[]> {
    const query = 'SELECT * from Trybesmith.products';
    const [products] = await this.connection.execute<IProduct[] & RowDataPacket[]>(query);
    return products;
  }

  public async getById(id:number): Promise<IProduct[]> {
    const query = 'SELECT * from Trybesmith.products WHERE id = ?';
    const [product] = await this.connection.execute<IProduct[] & RowDataPacket[]>(query, [id]);
    return product;
  }

  public async remove(id:number): Promise<void> {
    const query = 'DELETE from Trybesmith.products WHERE id = ?';
    await this.connection.execute(query, [id]);
  }

  public async update(product: IProduct, id: number): Promise<IProduct> {
    const query = 'UPDATE Trybesmith.products SET name = ?, amount = ? WHERE id = ?';
    await this.connection
      .execute(query, [product.name, product.amount, id]);
    return product;
  }
}

export default ProductsModel;