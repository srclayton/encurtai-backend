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
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
class RequestService {
    static onRequest(server) {
        server.addHook("onRequest", (request, reply, done) => {
            // eslint-disable-next-line
            //@ts-ignore
            if (request.protocol !== "https" && server.NODE_ENV !== "development") {
                return reply.code(400).send({
                    error: "Bad Request",
                    message: "HTTPS required",
                });
            }
            if (request.url !== "/user/login" ||
                (request.url === "/user/login" && request.method !== "POST")) {
                if (!request.headers.authorization) {
                    return reply.code(401).send({
                        error: "Unauthorized",
                        message: "No authorization header",
                    });
                }
            }
            else
                return done();
            if (request.url === "/user/refresh" && request.method === "POST") {
                const token = request.headers.authorization.split(" ")[1];
                try {
                    const decode = server.jwt.verify(token, {
                        // eslint-disable-next-line
                        //@ts-ignore
                        key: server.jwtPublicRefreshKey,
                    });
                    request.user = decode;
                }
                catch (err) {
                    return (reply
                        .code(401) // eslint-disable-next-line
                        //@ts-ignore
                        .send({ error: "Unauthorized", message: err.message }));
                }
                return done();
            }
            request
                .jwtVerify()
                .catch((err) => reply.code(401).send({ error: "Unauthorized", message: err.message }));
            done();
        });
    }
    static rateLimit(server) {
        return __awaiter(this, void 0, void 0, function* () {
            yield server.register(rate_limit_1.default, {
                global: true,
                max: 60,
                timeWindow: "1 minute",
            });
        });
    }
}
exports.default = RequestService;
//# sourceMappingURL=RequestService.js.map