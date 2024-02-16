import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
export default class RequestService {
  public static onRequest(server: FastifyInstance) {
    server.addHook("onRequest", (request, reply, done) => {
      this.parseCookies(request, reply);

      // Validando bypass para rota de login
      if (request.url === "/user/login" && request.method === "POST")
        return done();
      // Validando bypass para rota de refresh
      if (request.url === "/user/refresh" && request.method === "POST") {
        const refreshTokenCookie = request.cookies.refreshToken;

        // const token = request.headers.cookie?.split("refreshToken=")[1];
        if (!refreshTokenCookie)
          return reply
            .code(401)
            .send({ error: "Unauthorized", message: "No refresh token" });
        try {
          const decode = server.jwt.verify(refreshTokenCookie, {
            // eslint-disable-next-line
            //   @ts-ignore
            key: server.jwtPublicRefreshKey,
          });
          request.user = decode;
          return done();
        } catch (err: unknown) {
          return (
            reply
              .code(401) // eslint-disable-next-line
                          //@ts-ignore
              .send({ error: "Unauthorized", message: err.message })
          );
        }
      }

      try {
        const accessTokenCookie = request.cookies.accessToken;
        if (!accessTokenCookie)
          return reply
            .code(401)
            .send({ error: "Unauthorized", message: "No access token" });

        const decode = server.jwt.verify(accessTokenCookie);
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

  public static parseCookies(request: FastifyRequest, reply: FastifyReply) {
    try {
      const cookieArray = request.headers.cookie?.split(";");
      const cookies: { [key: string]: string } = {};
      cookieArray?.forEach((cookie) => {
        const cookieParts = cookie.split("=");
        const cookieName = cookieParts[0].trim();
        const cookieValue = cookieParts[1].trim();
        cookies[cookieName] = cookieValue;
      });

      request.cookies = cookies;
    } catch (err) {
      return (
        reply
          .code(401)
          // eslint-disable-next-line
          // @ts-ignore
          .send({ error: "Unauthorized", message: err.message })
      );
    }
  }

  public static registerCorsAndCookie(server: FastifyInstance) {
    server.register(fastifyCookie);
    server.register(cors, {
      // eslint-disable-next-line
      // @ts-ignore
      origin: server.ORIGIN,
      credentials: true,
    });
  }
}
