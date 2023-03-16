import { Pool } from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/userInterface';

type User = Omit <IUser, 'id'>;
class UserModel {
  // public connection
  constructor(readonly connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<IUser> {
    const query = `INSERT INTO Trybesmith.users (username, vocation, level, password)
      VALUES (?, ?, ?, ?)`; 
    const [{ insertId }] = await this.connection
      .execute<IUser & ResultSetHeader>(
      query,
      [user.username, user.vocation, user.level, user.password],
    );
    return { id: insertId, ...user };
  }

  public async getAll(): Promise<IUser[]> {
    const query = 'SELECT * from Trybesmith.users';    
    const [users] = await this.connection.execute<IUser[] & RowDataPacket[]>(query);
    return users;
  }

  public async getByUsername(username: string): Promise<IUser> {
    const query = 'SELECT * from Trybesmith.users WHERE username = ?';
    const [[result]] = await this.connection
      .execute<IUser[] & RowDataPacket[]>(query, [username]);
    return result;
  }
}

export default UserModel;