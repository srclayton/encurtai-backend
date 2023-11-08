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
const ControllerBase_1 = __importDefault(require("./ControllerBase"));
const User_1 = __importDefault(require("../models/User"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
class UserController extends ControllerBase_1.default {
    verifyLogin(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = request.body;
            if (!username || !password) {
                return reply.code(400).send({
                    error: "Bad request",
                    message: "Login and password are required",
                });
            }
            const result = yield this.db.getByField("username", username);
            const resultError = this.verifyContent(result);
            if (resultError)
                return reply.status(404).send(resultError);
            if (result.password !== password) {
                return reply.code(401).send({
                    error: "Unauthorized",
                    message: "Wrong password",
                });
            }
            const user = new User_1.default(result.id, result.username, result.password, result.admin);
            const access_token = yield TokenService_1.default.generateToken(request.server, user);
            const refresh_token = yield TokenService_1.default.generateRefreshToken(request.server, user);
            return reply.code(200).send({
                access_token,
                refresh_token,
            });
        });
    }
    refreshToken(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sub } = request.user;
            const result = yield this.db.getById(sub);
            const resultError = this.verifyContent(result);
            if (resultError)
                return reply.status(404).send(resultError);
            const user = new User_1.default(result.id, result.username, result.password, result.admin);
            const access_token = yield TokenService_1.default.generateToken(request.server, user);
            reply.code(200).send({ access_token });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map