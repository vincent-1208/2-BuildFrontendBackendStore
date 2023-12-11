
const {
    NODE_ENV="dev",
    PORT,
    // # Database
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_DEV,
    DB_HOST,
    PASSWORD_SECRET,
    SALT_ROUND,
    TOKEN_SECRET
} = process.env

export default {
    postgres: {
        host: DB_HOST,
        database: POSTGRES_DB_DEV,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    },
    port: PORT,
    nodeenv: NODE_ENV,
    password_secret: PASSWORD_SECRET,
    salt_round: SALT_ROUND,
    token_secret: TOKEN_SECRET
}