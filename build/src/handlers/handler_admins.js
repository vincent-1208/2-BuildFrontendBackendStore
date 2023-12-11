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
const admins_1 = require("../models/admins");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_1 = __importDefault(require("../middleware/verify"));
const { TOKEN_SECRET = '' } = process.env;
const store = new admins_1.Admins();
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
            username: _req.body.username,
            password: _req.body.password,
            id: undefined,
        };
        const res = yield store.create(data);
        _res.status(200);
        _res.json({ data: res });
    }
    catch (err) {
        _res.status(400);
        _res.json({ data: `Could NOT add new admins ${_req.body.username}. ${err}` });
    }
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = yield store.authenticate(req.body.username, req.body.password);
        if (!u) {
            res.status(401).json({ message: 'Invalid Username or Password !!!' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ user: u }, TOKEN_SECRET);
        res.status(200);
        res.json({ token: token });
    }
    catch (err) {
        res.status(400);
        res.json({ message: `${err}` });
    }
});
const admin_router = (app) => {
    app.post('/admin', verify_1.default, create);
    app.post('/admin/login', authenticate);
    app.get('/admin', verify_1.default, index);
    app.get('/admin/:id', verify_1.default, read);
};
exports.default = admin_router;
