import Client from '../database';

export type orderType = {
  id?: number;
  status: string;
  user_id: string;
};

export class Orders {
  async index(): Promise<orderType[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM Orders';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Orders ${err}`);
    }
  }

  async read(id: string): Promise<orderType> {
    try {
      const sql = 'SELECT * FROM Orders WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: orderType): Promise<orderType> {
    try {
      const sql =
        'INSERT INTO Orders (status, user_id) VALUES($1, $2) RETURNING *';
      const connect = await Client.connect();
      const result = await connect.query(sql, [o.status, o.user_id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
    }
  }

  async update(o: orderType): Promise<orderType> {
    try {
      const sql =
        ' UPDATE Orders\
                    SET status = ($2), user_id = ($3)\
                    WHERE id = ($1) ';
      const connect = await Client.connect();
      const result = await connect.query(sql, [o.id, o.status, o.user_id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<orderType> {
    try {
      const sql = 'DELETE FROM Orders WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
