"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const Server_1 = __importDefault(require("./Server"));
const logger_1 = __importDefault(require("./config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV;
const loggerOptions = NODE_ENV === "development" ? (0, logger_1.default)() : true;
const server = (0, fastify_1.default)({ logger: loggerOptions });
server.decorate("NODE_ENV", NODE_ENV);
Server_1.default.main(server);
//# sourceMappingURL=start.js.map