/* Replace with your SQL commands */
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(24) NOT NULL,
    last_name VARCHAR(24) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO public.users (first_name,last_name,username,"password") VALUES ('Vu','Vo','vuvtm','123456789');