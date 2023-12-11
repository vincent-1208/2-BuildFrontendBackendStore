/* Replace with your SQL commands */
CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price Integer NOT NULL,
    category VARCHAR(64)
);

INSERT INTO public.Product (name, price, category) VALUES ('product1','200', 'hot');