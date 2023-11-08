"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const UrlRoutes_1 = __importDefault(require("../routes/UrlRoutes"));
class RouteService {
    static registerRoutes(server) {
        server.register(() => UserRoutes_1.default.register(server, "user"));
        server.register(() => UrlRoutes_1.default.register(server, "url"));
    }
}
exports.default = RouteService;
//# sourceMappingURL=RouteService.js.map