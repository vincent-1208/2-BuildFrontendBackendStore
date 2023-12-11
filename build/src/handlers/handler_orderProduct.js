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
const orderProduct_1 = require("../models/orderProduct");
const verify_1 = __importDefault(require("../middleware/verify"));
const store = new orderProduct_1.orderProducts();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield store.index();
        if (!data) {
            res.status(404).json({ message: 'Data not found !!!' });
            return;
        }
        res.json(data);
    }
    catch (err) {
        res.status(400);
        res.json({ message: `${err}` });
    }
});
const read = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield store.read(_req.params.id);
        if (!data) {
            res.status(404).json({ message: 'Data not found !!!' });
            return;
        }
        res.json(data);
    }
    catch (err) {
        res.status(400);
        res.json({ message: `${err}` });
    }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const create = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            quantity: _req.body.quantity,
            order_id: _req.body.orderId,
            product_id: _req.body.productId
        };
        const res = yield store.create(data);
        _res.status(200);
        _res.json({ data: res });
    }
    catch (err) {
        _res.status(400);
        _res.json({ data: `Could NOT add new orderProduct ${_req.body.orderId}. ${err}` });
    }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleted = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield store.delete(_req.params.id);
        _res.status(200);
        _res.json(data);
    }
    catch (err) {
        _res.status(400);
        _res.json({ data: `Could NOT delete product ${_req.params.id}` });
    }
});
const orderProduct_router = (app) => {
    app.post('/orderproduct', verify_1.default, create);
    app.delete('/orderproduct/:id', verify_1.default, deleted);
    app.get('/orderproduct', index);
    app.get('/orderproduct/:id', read);
};
exports.default = orderProduct_router;
