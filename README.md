Storefront Backend Project
Setup Project
1. Run npm install to install package dependencies
2. Setup PostgreSQL & create database user
Setup PostgreSQL on premise or use PostgreSQL docker
Create database user & database:
    CREATE USER admin WITH PASSWORD 'admin123';
    CREATE DATABASE database_dev;
    \c database_dev
GRANT ALL PRIVILEGES ON DATABASE database_dev TO admin;
3. Create .env file
NODE_ENV="dev"
PORT=3000
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB_DEV=database_dev
POSTGRES_DB_TEST=database_test
DB_HOST=localhost
PASSWORD_SECRET_BCRYPT = 123
SALT_ROUND = 10
TOKEN_SECRET = 1234

PORT: the port number to run server api
POSTGRES_HOST: the host of database server
POSTGRES_DB_DEV: the database name
POSTGRES_USER: the username of database server
POSTGRES_PASSWORD: the password of database server
POSTGRES_DB_TEST: the test database name
PASSWORD_SECRET_BCRYPT: the key to hash user password with bcrypt. (Default: 123456, if change, please update password for admin in migration script migrations/sqls/20230707091801-admin-table-up.sql)
SALT_ROUND: the parameter to for bcrypt
TOKEN_SECRET: the secret to check jwt token
4. Database migrations
Update database.json file
{
    "dev": {
      "username": {"ENV":"POSTGRES_USER"},
      "password": {"ENV":"POSTGRES_PASSWORD"},
      "database": {"ENV":"POSTGRES_DB_DEV"},
      "host": "localhost",
      "driver": "pg"
    },

    "test": {
      "username": {"ENV":"POSTGRES_USER"},
      "password": {"ENV":"POSTGRES_PASSWORD"},
      "database": {"ENV":"POSTGRES_DB_TEST"},
      "host": "localhost",
      "driver": "pg"
    }
}
Update .env file if necessary
Update script test:prepare in package.json file if using other test database (default: database_test)

Run migrations script
db-migrate up

Run the project
Open the terminal, run (default host: localhost:3000):
npm run start
Admin Account to login system:
username: admin
password: 123456789
To run production, run:
npm dev

Run test for the project
Open the terminal, run:
npm run test
Note: please make sure setup .env file and database.json file`

API Endpoints
1. Admin
[GET] /admin [admin token required]
[GET] /admin/:id [admin token required]
[POST] /admin [admin token required]
[POST] /admin/login
2. User
[GET] /user [admin token required]
[GET] /user/:id [admin token required]
[POST] /users[admin token required]
[DELETE] /user/:id [admin token required]
3. Product
[GET] /product
[GET] /product/:id
[POST] /product [admin token required]
[DELETE] /product/:id [admin token required]
4. Order
[GET] orders
[GET] orders/:id
[POST] orders [admin token required]
[DELETE] rders/:id [admin token required]

Connect to API
Using postman collection that import from StoreFront_API.postman_collection.json file