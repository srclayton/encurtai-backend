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
const RouteBase_1 = __importDefault(require("./RouteBase"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes extends RouteBase_1.default {
    static register(server, route) {
        const _super = Object.create(null, {
            register: { get: () => super.register }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.register.call(this, server, route);
            const controller = new UserController_1.default(route);
            server.post(`/${route}/login`, {
                schema: {
                    description: "A rota /login retorna um token de acesso e um token de atualização.",
                    tags: [route],
                    response: {
                        200: {
                            description: "Successful response",
                            $ref: `reply_login_schema#`,
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () { return controller.verifyLogin(request, reply); }));
            // @TODO: ADICIONAR A ROTA REFRESH
            server.post(`/${route}/refresh`, {
                schema: {
                    description: "A rota /refresh retorna um token de acesso.",
                    tags: [route],
                    response: {
                        200: {
                            description: "Successful response",
                            $ref: `reply_refresh_schema#`,
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () { return controller.refreshToken(request, reply); }));
        });
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map