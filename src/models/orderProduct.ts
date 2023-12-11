import Client from '../database';

export type orderProductType = {
  id?: number;
  quantity: string;
  order_id: string;
  product_id: string;
};

export class orderProducts {
  async index(): Promise<orderProductType[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM Order_product';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get order product ${err}`);
    }
  }

  async read(id: string): Promise<orderProductType> {
    try {
      const sql = 'SELECT * FROM Order_product WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order product ${id}. Error: ${err}`);
    }
  }

  async create(o: orderProductType): Promise<orderProductType> {
    try {
      const sql =
        'INSERT INTO Order_product (quantity, order_id, product_id ) VALUES($1, $2, $3) RETURNING *';
      const connect = await Client.connect();
      const result = await connect.query(sql, [
        o.quantity,
        o.order_id,
        o.product_id,
      ]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not add new admin ${o.order_id}. Error: ${err}`);
    }
  }

  async update(o: orderProductType): Promise<orderProductType> {
    try {
      const sql =
        ' UPDATE Order_product\
                    SET quantity = ($2), order_id = ($3), product_id = ($4)\
                    WHERE id = ($1) ';
      const connect = await Client.connect();
      const result = await connect.query(sql, [
        o.id,
        o.quantity,
        o.order_id,
        o.product_id,
      ]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not update order product ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<orderProductType> {
    try {
      const sql = 'DELETE FROM Order_product WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete order product ${id}. Error: ${err}`);
    }
  }
}
