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
const dbAccess_1 = __importDefault(require("../database/dbAccess"));
class ControllerBase {
    constructor(table, db = new dbAccess_1.default(table)) {
        this.table = table;
        this.db = db;
    }
    verifyContent(content) {
        if (!content) {
            return {
                error: "Not found",
                message: "Not found records in database.",
            };
        }
        else
            return null;
    }
    getAll(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get count of all records
            const count = yield this.db.getCount();
            // Check if count is valid
            const countError = this.verifyContent(count);
            if (countError)
                return reply.status(404).send(countError);
            // Get all records
            const result = yield this.db.getAll();
            // Check if result is valid
            const resultError = this.verifyContent(result);
            // If result is not valid return error
            if (resultError)
                return reply.status(404).send(resultError);
            return reply.send({
                total: count,
                data: result,
            });
        });
    }
    getById(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructure id from params
            const { id } = request.params;
            // Check if id is valid
            if (!id)
                return reply.status(400).send({
                    error: "Bad request",
                    message: "Id is required.",
                });
            const result = yield this.db.getById(id);
            // Check if result is valid
            const resultError = this.verifyContent(result);
            // If result is not valid return error
            if (resultError)
                return reply.status(404).send(resultError);
            return reply.send(result);
        });
    }
    getByPage(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructure page and limit from query string
            const { page, limit } = request.query;
            // Check if page and limit are valid numbers and in valid range
            if (!page || !limit || page < 1 || limit <= 1 || limit > 100) {
                return reply.status(400).send({
                    error: "Bad request",
                    message: `Page must be > 1 and limit must be > 1 and <= 100. Current values: page: ${page}, limit: ${limit}`,
                });
            }
            // Get count of all records
            const count = yield this.db.getCount();
            // Check if count is valid
            const countError = this.verifyContent(count);
            if (countError)
                return reply.status(404).send(countError);
            // Calculate maxPage
            const maxPage = Math.ceil(count / limit);
            // Check if page is valid
            if (page > maxPage) {
                return reply.status(404).send({
                    message: `Page must be <= ${maxPage}. Current value page: ${page}`,
                });
            }
            const result = yield this.db.getByPage(page, limit);
            // Check if result is valid
            const resultError = this.verifyContent(result);
            // If result is not valid return error
            if (resultError)
                return reply.status(404).send(resultError);
            return reply.send({
                hasPrevious: page > 1,
                hasNext: page < maxPage,
                data: result,
            });
        });
    }
    create(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            // Destructure body from request
            const { body } = request;
            if (!body)
                return reply.status(400).send({
                    error: "Bad request",
                    message: "Body is required.",
                });
            const { username } = request.body;
            // Check if username is valid
            const checkUsername = yield this.db.getByField("username", username);
            console.log(checkUsername);
            if (checkUsername)
                return reply.status(409).send({
                    error: "Bad request",
                    message: "Username already exists.",
                });
            const result = yield this.db.create(body);
            // Check if result is valid
            const resultError = this.verifyContent(result);
            // If result is not valid return error
            if (resultError)
                return reply.status(404).send(resultError);
            return reply.send(result);
        });
    }
}
exports.default = ControllerBase;
//# sourceMappingURL=ControllerBase.js.map