"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
function createLogger() {
    return (0, pino_1.default)({
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                colorizeObjects: true,
            },
        },
    });
}
exports.default = createLogger;
//# sourceMappingURL=logger.js.map