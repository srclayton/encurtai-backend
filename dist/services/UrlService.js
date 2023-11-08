"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class UrlService {
    static generateShortUrl() {
        return crypto_1.default.randomBytes(8).toString("base64url");
    }
}
exports.default = UrlService;
//# sourceMappingURL=UrlService.js.map