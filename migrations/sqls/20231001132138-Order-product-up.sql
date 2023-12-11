/* Replace with your SQL commands */
CREATE TABLE Order_product (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES Orders(id),
    product_id bigint REFERENCES Product(id)
);