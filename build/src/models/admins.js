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
exports.Admins = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PASSWORD_SECRET_BCRYPT = '', SALT_ROUND = '10' } = process.env;
class Admins {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM Admin';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                console.log(err);
                throw new Error(`Cannot get Admin ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM Admin WHERE id=($1)`;
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find admin ${id}. Error: ${err}`);
            }
        });
    }
    create(a) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Admin (username, password) VALUES($1, $2) RETURNING *';
                const connect = yield database_1.default.connect();
                const hash = yield bcrypt_1.default.hash(a.password + PASSWORD_SECRET_BCRYPT, parseInt(SALT_ROUND));
                const result = yield connect.query(sql, [a.username, hash]);
                const book = result.rows[0];
                console.log(book);
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not add new admin ${a.username}. Error: ${err}`);
            }
        });
    }
    update(a) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = ' UPDATE Admin\
                    SET username = ($2), password = ($3)\
                    WHERE id = ($1) ';
                const connect = yield database_1.default.connect();
                const hash = yield bcrypt_1.default.hash(a.password + PASSWORD_SECRET_BCRYPT, parseInt(SALT_ROUND));
                const result = yield connect.query(sql, [a.id, a.username, hash]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not update admin ${a.username}. Error: ${err}`);
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
exports.Admins = Admins;
