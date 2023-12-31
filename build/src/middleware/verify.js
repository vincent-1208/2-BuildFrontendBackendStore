"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET = '' } = process.env;
const verifyToken = (req, res, 
// eslint-disable-next-line @typescript-eslint/ban-types
next) => {
    try {
        const authorizationHeader = req.headers.authorization || ' ';
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('Access Denied, Invalid Token !!!');
        return;
    }
};
exports.default = verifyToken;
