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
const UrlService_1 = __importDefault(require("../services/UrlService"));
const Url_1 = __importDefault(require("../models/Url"));
class UrlController extends ControllerBase_1.default {
    getOriginalUrl(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shortUrl } = request.params;
            const result = yield this.db.getByField("shortUrl", shortUrl);
            const resultError = this.verifyContent(result);
            if (resultError)
                return reply.code(404).send(resultError);
            return reply.send(result);
        });
    }
    createShortUrl(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { originalUrl, personalUrl } = request.body;
            if (!originalUrl) {
                return reply.code(400).send({
                    error: "Bad request",
                    message: "Original URL is required",
                });
            }
            let shortUrl, result;
            if (personalUrl) {
                result = yield this.db.getByField("shortUrl", personalUrl);
                if (result) {
                    return reply.code(400).send({
                        error: "Bad request",
                        message: "Personal URL already exists",
                    });
                }
                shortUrl = personalUrl;
            }
            else {
                do {
                    shortUrl = UrlService_1.default.generateShortUrl();
                    result = yield this.db.getByField("shortUrl", shortUrl);
                } while (result);
            }
            const url = new Url_1.default(originalUrl, shortUrl, 
            // eslint-disable-next-line
            // @ts-ignore
            request.user.sub);
            const newUrl = yield this.db.create(url);
            return reply.code(201).send(newUrl);
        });
    }
}
exports.default = UrlController;
//# sourceMappingURL=UrlController.js.map