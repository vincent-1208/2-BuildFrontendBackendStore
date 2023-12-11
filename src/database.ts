// import config from '../config'
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

let Client = new Pool({
  host: DB_HOST,
  database: POSTGRES_DB_DEV,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

if (ENV === 'test') {
  Client = new Pool({
    host: DB_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default Client;
