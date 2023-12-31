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
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const admins_1 = require("../../models/admins");
const admin = new admins_1.Admins();
describe('Test module admin', () => {
    it('Define index:', () => {
        expect(admin.index).toBeDefined();
    });
    it('Read row:', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield admin.read('1');
        expect(result.id).toEqual(1);
        expect(result.username).toEqual('admin');
    }));
    it('Create row:', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(admin.create).toBeDefined();
    }));
    it('Authenticate:', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(admin.authenticate).toBeDefined();
    }));
});
