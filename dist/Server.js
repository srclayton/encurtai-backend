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
const dotenv_1 = __importDefault(require("dotenv"));
const SchemaService_1 = __importDefault(require("./services/SchemaService"));
const RequestService_1 = __importDefault(require("./services/RequestService"));
const RouteService_1 = __importDefault(require("./services/RouteService"));
const ReplyService_1 = __importDefault(require("./services/ReplyService"));
const JwtService_1 = __importDefault(require("./services/JwtService"));
const ErrorHandler_1 = __importDefault(require("./services/ErrorHandler"));
class Server {
    static main(server) {
        dotenv_1.default.config();
        const PORT = process.env.SERVER_PORT
            ? parseInt(process.env.SERVER_PORT)
            : 5541;
        SchemaService_1.default.addUrlSchemas(server);
        SchemaService_1.default.addUserSchemas(server);
        RequestService_1.default.rateLimit(server);
        RouteService_1.default.registerRoutes(server);
        ReplyService_1.default.onSend(server);
        RequestService_1.default.onRequest(server);
        ErrorHandler_1.default.setErrorHandler(server);
        JwtService_1.default.RegisterKeys(server);
        // TODO error handling
        const start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield server.listen({ host: "0.0.0.0", port: PORT });
            }
            catch (err) {
                server.log.error(err);
                process.exit(1);
            }
        });
        start();
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map