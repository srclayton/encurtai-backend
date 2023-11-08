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
const prisma_1 = require("../lib/prisma");
class DbAccess {
    // eslint-disable-next-line
    // @ts-ignore @TODO: Fix this
    constructor(table, db = prisma_1.prisma) {
        this.table = table;
        this.db = db;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore @TODO: Fix this 
                const result = yield this.db[this.table].findMany();
                return result;
            }
            catch (err) {
                throw new Error(`Error getting data from database: ${err}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore @TODO: Fix this 
                const result = yield this.db[this.table].findUnique({
                    where: { id },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error getting data from database: ${err}`);
            }
        });
    }
    getByPage(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore @TODO: Fix this 
                const result = yield this.db[this.table].findMany({
                    skip: (page - 1) * limit,
                    // eslint-disable-next-line
                    // @ts-ignore @TODO: Fix this 
                    take: parseInt(limit),
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error getting data from database: ${err}`);
            }
        });
    }
    getByField(field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore
                const result = yield this.db[this.table].findUnique({
                    where: { [field]: value },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error getting data from database: ${err}`);
            }
        });
    }
    getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore
                const result = yield this.db[this.table].count();
                return result;
            }
            catch (err) {
                throw new Error(`Error getting data from database: ${err}`);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore
                const result = yield this.db[this.table].create({
                    data,
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error creating data in database: ${err}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore
                const result = yield this.db[this.table].update({
                    where: { id },
                    data,
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error updating data in database: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // eslint-disable-next-line
                // @ts-ignore
                const result = yield this.db[this.table].delete({
                    where: { id },
                });
                return result;
            }
            catch (err) {
                throw new Error(`Error deleting data in database: ${err}`);
            }
        });
    }
}
exports.default = DbAccess;
//# sourceMappingURL=dbAccess.js.map