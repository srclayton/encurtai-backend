"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static setErrorHandler(server) {
        // server.setNotFoundHandler(
        //   {
        //     preHandler: server.rateLimit({
        //       max: 4,
        //       timeWindow: 500,
        //     }),
        //   },
        //   function (request, reply) {
        //     reply.code(404).send({ hello: "world" });
        //   },
        // );
        server.setErrorHandler((error, request, reply) => {
            if (error.statusCode === 429) {
                server.log.warn(error);
                return reply.code(429).send({
                    error: "Too Many Requests",
                    message: error.message,
                });
            }
            server.log.error(error);
            return reply.send({
                error: error.name,
                message: error.message,
            });
        });
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map