import { Pool } from 'mysql2/promise';
// import { RowDataPacket } from 'mysql2';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import IOrder from '../interfaces/orderInterface';

class OrderModel {
  // public connection
  constructor(readonly connection: Pool) {
    this.connection = connection;
  }

  public async create(order: IOrder): Promise<IOrder> {
    // need to work on the query string
    const query = `INSERT INTO Trybesmith.orders (user_id)
      VALUES (?)`; 
    const [{ insertId }] = await this.connection
      .execute<IOrder & ResultSetHeader>(
      query,
      [order.userId],
    );
    await this.connection.query(
      `UPDATE Trybesmith.products
      SET order_id = ?
      WHERE id IN (?)`,
      [insertId, order.productsIds],
    );
    return { productsIds: order.productsIds, userId: order.userId };
    // return { id: insertId, productsIds: order.productsIds, userId: order.userId };
  }

  public async getAll(): Promise<IOrder[]> {
    const query = `
    SELECT orders.id, orders.user_id as userId, JSON_ARRAYAGG(products.id) as productsIds
    FROM Trybesmith.orders
    INNER JOIN Trybesmith.products
    WHERE orders.id = products.order_id
    GROUP BY orders.id;
    `;    
    const [users] = await this.connection.execute<IOrder[] & RowDataPacket[]>(query);
    return users;
  }
}

export default OrderModel;