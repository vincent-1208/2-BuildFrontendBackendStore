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
describe('Test Admin Endpoint', () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJ1c2VybmFtZSI6InRobmciLCJwYXNzd29yZCI6IiQyYiQxMCRneS5Bc2RFZWE1RkRBUS9tZS5ETWtlQ2IxU0tubXh0M1p5aTNjTWdpM0NxWFpuLmNSSFA0ZSJ9LCJpYXQiOjE2OTY2Njg3NTh9.hq5QQF_Dun4SPPrQEXmx-GVkifIWI2DCEwYt3d5Crvw';
    it('Login success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/admin/login')
            .send({ username: 'admin', password: '123456789' });
        expect(response.status).toBe(200);
    }));
    it('Login fail', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/admin/login')
            .send({ username: 'admin', password: '1234567' });
        expect(response.status).toBe(401);
    }));
    it('Admin list success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/admin').set('authorization', token);
        expect(response.status).toBe(200);
    }));
    it('Admin list fail, un-authorize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/admin');
        expect(response.status).toBe(401);
    }));
    it('Admin with id=1 success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/admin/1').set('authorization', token);
        expect(response.status).toBe(200);
    }));
    it('Admin with id=1 fail, un-authorize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/admin/1');
        expect(response.status).toBe(401);
    }));
    // it('Create Admin success', async () => {
    //   const response = await request
    //     .post('/admin')
    //     .set('authorization', token)
    //     .send({ username: 'admin2', password: '123456' });
    //   expect(response.status).toBe(200);
    // });
    it('Create Admin fail, un-authorize', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/admin')
            .send({ username: 'admin3', password: '123456' });
        expect(response.status).toBe(401);
    }));
});
