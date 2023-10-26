import { FastifyInstance } from "fastify";

export default function onRequestService(server: FastifyInstance) {
  server.addHook("onRequest", (request, reply, done) => {
    // if (request.protocol !== "https") {
    //   return reply.redirect(`https://${request.hostname}${request.url}`);
    // }
    if (request.url !== "/user/login") {
      if (!request.headers.authorization) {
        return reply
          .code(401)
          .send({ error: "Unauthorized", message: "No authorization header" });
      }
    } else return done();
    request
      .jwtVerify()
      .catch((err) =>
        reply.code(401).send({ error: "Unauthorized", message: err.message }),
      );

    done();
  });
}
