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
const ControllerBase_1 = __importDefault(require("../controllers/ControllerBase"));
class RouteBase {
    static register(server, route) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new ControllerBase_1.default(route);
            server.get(`/${route}`, {
                schema: {
                    description: "A rota / retorna todos os registros.",
                    tags: [route],
                    response: {
                        200: {
                            description: "Successful response",
                            properties: {
                                total: { type: "number" },
                                hasPrevious: { type: "boolean" },
                                hasNext: { type: "boolean" },
                                data: {
                                    type: "array",
                                    items: { $ref: `reply_all_${route}_schema#` },
                                },
                            },
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
                return request.query && Object.keys(request.query).length > 0
                    ? controller.getByPage(request, reply)
                    : controller.getAll(request, reply);
            }));
            server.get(`/${route}/:id`, {
                schema: {
                    description: "A rota /:id retorna um registro a partir de um ID.",
                    tags: [route],
                    // params: {
                    // $ref: "paramsUrlSchema#",
                    // },
                    response: {
                        200: {
                            description: "Successful response",
                            $ref: `reply_${route}_by_id_schema#`,
                        },
                    },
                },
            }, (request, reply) => __awaiter(this, void 0, void 0, function* () { return controller.getById(request, reply); }));
            // server.post(`/${route}`, async (request, reply) =>
            //   controller.create(request, reply),
            // );
        });
    }
}
exports.default = RouteBase;
//# sourceMappingURL=RouteBase.js.map