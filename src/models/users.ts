import Client from '../database';
import bcrypt from 'bcrypt';
const { PASSWORD_SECRET_BCRYPT = '', SALT_ROUND = '10' } = process.env

export type userType = {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

export class Users {
  async index(): Promise<userType[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM Users';
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`);
    }
  }

  async read(id: string): Promise<userType> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: userType): Promise<userType> {
    try {
      const sql =
        'INSERT INTO Users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
      const connect = await Client.connect();
      const hash = await bcrypt.hash(
        u.password + PASSWORD_SECRET_BCRYPT,
        parseInt(SALT_ROUND),
      );
      const result = await connect.query(sql, [
        u.first_name,
        u.last_name,
        u.username,
        hash,
      ]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
    }
  }

  async update(u: userType): Promise<userType> {
    try {
      const sql =
        ' UPDATE Users\
                    SET first_name = ($2), last_name = ($3), username = ($4), password = ($5)\
                    WHERE id = ($1) ';
      const connect = await Client.connect();
      const result = await connect.query(sql, [
        u.id,
        u.first_name,
        u.last_name,
        u.username,
        u.password,
      ]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not update user ${u.username}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<userType> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1)';
      const connect = await Client.connect();
      const result = await connect.query(sql, [id]);
      const book = result.rows[0];
      connect.release();
      return book;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<userType | undefined | null> {
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
