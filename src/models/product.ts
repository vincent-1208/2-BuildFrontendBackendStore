import Client from '../database';

export type productType = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class Products {
  async index(): Promise<productType[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM Product';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Product ${err}`);
    }
  }

  async read(id: string): Promise<productType> {
    try {
      const sql = 'SELECT * FROM Product WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  async create(p: productType): Promise<productType> {
    try {
      const sql =
        'INSERT INTO Product (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const connect = await Client.connect();
      const result = await connect.query(sql, [p.name, p.price, p.category]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not add new user ${p.name}. Error: ${err}`);
    }
  }

  async update(p: productType): Promise<productType> {
    try {
      const sql =
        ' UPDATE Product\
                    SET name = ($2), price = ($3), category = ($4)\
                    WHERE id = ($1) ';
      const connect = await Client.connect();
      const result = await connect.query(sql, [
        p.id,
        p.name,
        p.price,
        p.category,
      ]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<productType> {
    try {
      const sql = 'DELETE FROM Product WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
