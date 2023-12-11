/* Replace with your SQL commands */
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id bigint REFERENCES Users(id)
);