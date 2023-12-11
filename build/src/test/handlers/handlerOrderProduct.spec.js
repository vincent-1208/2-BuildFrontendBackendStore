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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const request = (0, supertest_1.default)(app_1.default);
describe('Test order product Endpoint', () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';
    it('Create order product success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orderproduct')
            .set('authorization', token)
            .send({
            "quantity": "5",
            "orderId": "1",
            "productId": "1"
        });
        expect(response.status).toBe(200);
    }));
    it('Create order product fail, un-authorize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/orderproduct')
            .send({
            "quantity": "5",
            "orderId": "1",
            "productId": "1"
        });
        expect(response.status).toBe(401);
    }));
    it('Order product list success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orderproduct');
        expect(response.status).toBe(200);
    }));
    it('Order product with id=1 success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/orderproduct/1');
        expect(response.status).toBe(200);
    }));
    it('Delete order product false', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete('/orderproduct/1');
        expect(response.status).toBe(401);
    }));
    it('Delete order product success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete('/orderproduct/1')
            .set('authorization', token);
        expect(response.status).toBe(200);
    }));
});
