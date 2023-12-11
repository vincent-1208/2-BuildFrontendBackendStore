/* Replace with your SQL commands */
CREATE TABLE Admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO public.Admin (username,"password") VALUES ('admin','$2b$10$1xyQ2zLi7eVtdB45jRwRqelnETYB6SFxmYE372vO9zHDXz5.uwgSi');