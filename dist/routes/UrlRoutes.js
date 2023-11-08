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
const UrlController_1 = __importDefault(require("../controllers/UrlController"));
class UrlRoutes extends RouteBase_1.default {
    static register(server, route) {
        const _super = Object.create(null, {
            register: { get: () => super.register }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.register.call(this, server, route);
            const controller = new UrlController_1.default(route);
            server.get(`/${route}/get/:shortUrl`, {
                schema: {
                    description: "A rota /get/:shortUrl retorna a URL original a partir de uma URL curta.",
                    tags: [route],
                    // params: {
                    // $ref: "paramsUrlSchema#",
                    // },
                    response: {
                        200: {
                            description: "Successful response",
                            $ref: "reply_get_original_url_schema#",
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () { return controller.getOriginalUrl(request, reply); }));
            server.post(`/${route}`, {
                schema: {
                    description: "A rota / cria uma URL curta a partir de uma URL original.",
                    tags: [route],
                    response: {
                        201: {
                            description: "Successful response",
                            $ref: "reply_url_create_schema#",
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () { return controller.createShortUrl(request, reply); }));
        });
    }
}
exports.default = UrlRoutes;
//# sourceMappingURL=UrlRoutes.js.map