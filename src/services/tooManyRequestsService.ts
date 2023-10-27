import { FastifyInstance } from "fastify";

export default function tooManyRequests(server: FastifyInstance) {
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
      reply.code(429);
      error.message = "Too many requests, please try again later.";
    }
    reply.send(error);
  });
}