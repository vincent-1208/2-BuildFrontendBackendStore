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
exports.Products = void 0;
const database_1 = __importDefault(require("../database"));
class Products {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM Product';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get Product ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Product WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find Product ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Product (name, price, category) VALUES($1, $2, $3) RETURNING *';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [p.name, p.price, p.category]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not add new user ${p.name}. Error: ${err}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = ' UPDATE Product\
                    SET name = ($2), price = ($3), category = ($4)\
                    WHERE id = ($1) ';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [
                    p.id,
                    p.name,
                    p.price,
                    p.category,
                ]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not update product ${p.name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Product WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
        });
    }
}
exports.Products = Products;
