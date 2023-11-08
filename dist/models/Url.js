"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Url {
    constructor(originalUrl, shortUrl, userId) {
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.userId = userId;
    }
    getOriginalUrl() {
        return this.originalUrl;
    }
    getShortUrl() {
        return this.shortUrl;
    }
}
exports.default = Url;
//# sourceMappingURL=Url.js.map