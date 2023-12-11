import Client from '../database';
import bcrypt from 'bcrypt';

const { PASSWORD_SECRET_BCRYPT = '', SALT_ROUND = '10' } = process.env;

export type adminType = {
  id?: number;
  username: string;
  password: string;
};

export class Admins {
  async index(): Promise<adminType[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM Admin';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`Cannot get Admin ${err}`);
    }
  }

  async read(id: string): Promise<adminType> {
    try {
      const sql = `SELECT * FROM Admin WHERE id=($1)`;
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find admin ${id}. Error: ${err}`);
    }
  }

  async create(a: adminType): Promise<adminType> {
    try {
      const sql =
        'INSERT INTO Admin (username, password) VALUES($1, $2) RETURNING *';
      const connect = await Client.connect();
      const hash = await bcrypt.hash(
        a.password + PASSWORD_SECRET_BCRYPT,
        parseInt(SALT_ROUND),
      );
      const result = await connect.query(sql, [a.username, hash]);
      const book = result.rows[0];
      console.log(book)
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not add new admin ${a.username}. Error: ${err}`);
    }
  }

  async update(a: adminType): Promise<adminType> {
    try {
      const sql =
        ' UPDATE Admin\
                    SET username = ($2), password = ($3)\
                    WHERE id = ($1) ';
      const connect = await Client.connect();
      const hash = await bcrypt.hash(
        a.password + PASSWORD_SECRET_BCRYPT,
        parseInt(SALT_ROUND),
      );
      const result = await connect.query(sql, [a.id, a.username, hash]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not update admin ${a.username}. Error: ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<adminType | undefined | null> {
    try {
      const sql = 'SELECT * FROM Admin WHERE username=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + PASSWORD_SECRET_BCRYPT, user?.password)) {
          return user;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(
        `Could NOT Authenticate Admin ${username}. Error: ${err}`,
      );
    }
  }
}
