"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const handler_admins_1 = __importDefault(require("./handlers/handler_admins"));
const handler_user_1 = __importDefault(require("./handlers/handler_user"));
const handler_orderProduct_1 = __importDefault(require("./handlers/handler_orderProduct"));
const handler_order_1 = __importDefault(require("./handlers/handler_order"));
const handler_product_1 = __importDefault(require("./handlers/handler_product"));
const { PORT = '3000' } = process.env;
const app = (0, express_1.default)();
const port = `${PORT}`;
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Welcome to my home');
});
(0, handler_admins_1.default)(app);
(0, handler_user_1.default)(app);
(0, handler_orderProduct_1.default)(app);
(0, handler_order_1.default)(app);
(0, handler_product_1.default)(app);
app.listen(PORT, function () {
    console.log(`starting app on: ${port}`);
});
exports.default = app;
