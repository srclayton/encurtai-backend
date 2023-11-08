import { FastifyInstance } from "fastify";

export default class ErrorHandler {
  public static setErrorHandler(server: FastifyInstance) {
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
        reply.code(429).send({
          error: "Too Many Requests",
          message: error.message,
        });
      }
      server.log.error(error);
      reply.send({
        error: error.name,
        message: error.message,
      });
    });
  }
}
