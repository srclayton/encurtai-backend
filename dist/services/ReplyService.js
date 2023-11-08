"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplyService {
    static onSend(server) {
        server.addHook("onSend", (request, reply, payload, done) => {
            reply.headers({
                "X-Content-Type": "application/json",
                "X-Frame-Options": "deny",
                "Content-Security-Policy": "default-src 'none'",
                Connection: "close",
            });
            reply.removeHeader("X-Powered-By");
            reply.removeHeader("Server");
            reply.removeHeader("x-content-type");
            done();
        });
    }
}
exports.default = ReplyService;
//# sourceMappingURL=ReplyService.js.map