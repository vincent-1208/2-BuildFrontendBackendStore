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
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
class Orders {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM Orders';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get Orders ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Orders WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Orders (status, user_id) VALUES($1, $2) RETURNING *';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [o.status, o.user_id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = ' UPDATE Orders\
                    SET status = ($2), user_id = ($3)\
                    WHERE id = ($1) ';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [o.id, o.status, o.user_id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not update order ${o.id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Orders WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
}
exports.Orders = Orders;
