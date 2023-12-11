API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

API Endpoints
Admin
Index [admin token required]: GET /admin
Read [admin token required]: GET /admin/:id
Create [admin token required]: POST /admin
Login [provide username, password]: POST /admin/login

Product
Index: GET /product
Read: GET /product/:id
Create [admin token required]: POST /product
Delete [admin token required]: DELETE /product/:id

User
Index [admin token required]: GET /user
Read [admin token required]: GET /user/:id
Create [admin token required]: POST /user
Delete [admin token required]: DELETE /user/:id

Order
Index : GET order
Read : GET order/:id
Create [admin token required] : POST /order
Delete [admin token required] : POST /order/id

Data Shapes

Admin
Database Table: admins Column list:
id SERIAL PRIMARY KEY,
username VARCHAR(32) UNIQUE,
password VARCHAR

User
Database Table: users Column list:
id SERIAL PRIMARY KEY,
first_name VARCHAR(24),
last_name VARCHAR(24),
username VARCHAR(32) UNIQUE,
password VARCHAR

Product
Database Table: products Column list:
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price Integer NOT NULL,
category VARCHAR(64)

Order
Database Table: orders Column list:
id SERIAL PRIMARY KEY,
status VARCHAR(15),
user_id bigint REFERENCES users(id)

Order_Product
Database Table: order_product Column list:
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)