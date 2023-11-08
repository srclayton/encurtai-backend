import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";
export default class RequestService {
  public static onRequest(server: FastifyInstance) {
    server.addHook("onRequest", (request, reply, done) => {
      // eslint-disable-next-line
      //@ts-ignore
      // if (request.protocol !== "https" && server.NODE_ENV !== "development") {
      //   return reply.code(400).send({
      //     error: "Bad Request",
      //     message: "HTTPS required",
      //   });
      // }
      if (
        request.url !== "/user/login" ||
        (request.url === "/user/login" && request.method !== "POST")
      ) {
        if (!request.headers.authorization) {
          return reply.code(401).send({
            error: "Unauthorized",
            message: "No authorization header",
          });
        }
      } else return done();
      if (request.url === "/user/refresh" && request.method === "POST") {
        const token = request.headers.authorization.split(" ")[1];
        try {
          const decode = server.jwt.verify(token, {
            // eslint-disable-next-line
          //@ts-ignore
            key: server.jwtPublicRefreshKey,
          });
          request.user = decode;
        } catch (err: unknown) {
          return (
            reply
              .code(401) // eslint-disable-next-line
                      //@ts-ignore
              .send({ error: "Unauthorized", message: err.message })
          );
        }
        return done();
      }
      request
        .jwtVerify()
        .catch((err) =>
          reply.code(401).send({ error: "Unauthorized", message: err.message }),
        );

      done();
    });
  }

  public static async rateLimit(server: FastifyInstance) {
    await server.register(fastifyRateLimit, {
      global: true,
      max: 60,
      timeWindow: "1 minute",
    });
  }
}
