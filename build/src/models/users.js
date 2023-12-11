"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PASSWORD_SECRET_BCRYPT = '', SALT_ROUND = '10' } = process.env;
class Users {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM Users';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get Users ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Users WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
                const connect = yield database_1.default.connect();
                const hash = yield bcrypt_1.default.hash(u.password + PASSWORD_SECRET_BCRYPT, parseInt(SALT_ROUND));
                const result = yield connect.query(sql, [
                    u.first_name,
                    u.last_name,
                    u.username,
                    hash,
                ]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.username}. Error: ${err}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = ' UPDATE Users\
                    SET first_name = ($2), last_name = ($3), username = ($4), password = ($5)\
                    WHERE id = ($1) ';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.username,
                    u.password,
                ]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not update user ${u.username}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Users WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Admin WHERE username=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [username]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + PASSWORD_SECRET_BCRYPT, user === null || user === void 0 ? void 0 : user.password)) {
                        return user;
                    }
                }
                else {
                    return null;
                }
            }
            catch (err) {
                throw new Error(`Could NOT Authenticate Admin ${username}. Error: ${err}`);
            }
        });
    }
}
exports.Users = Users;
