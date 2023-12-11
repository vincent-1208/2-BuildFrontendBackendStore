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
exports.orderProducts = void 0;
const database_1 = __importDefault(require("../database"));
class orderProducts {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM Order_product';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get order product ${err}`);
            }
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Order_product WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order product ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Order_product (quantity, order_id, product_id ) VALUES($1, $2, $3) RETURNING *';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [
                    o.quantity,
                    o.order_id,
                    o.product_id,
                ]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not add new admin ${o.order_id}. Error: ${err}`);
            }
        });
    }
    update(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = ' UPDATE Order_product\
                    SET quantity = ($2), order_id = ($3), product_id = ($4)\
                    WHERE id = ($1) ';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [
                    o.id,
                    o.quantity,
                    o.order_id,
                    o.product_id,
                ]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not update order product ${o.id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Order_product WHERE id=($1)';
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sql, [id]);
                const book = result.rows[0];
                connect.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not delete order product ${id}. Error: ${err}`);
            }
        });
    }
}
exports.orderProducts = orderProducts;
