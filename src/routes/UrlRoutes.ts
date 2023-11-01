import { FastifyInstance } from "fastify";
import RouteBase from "./RouteBase";
import UrlController from "../controllers/UrlController";

export default class UrlRoutes extends RouteBase {
  public static async register(
    server: FastifyInstance,
    route: string,
  ): Promise<void> {
    await super.register(server, route);
    const controller = new UrlController(route);
    server.get(
      `/${route}/get/:shortUrl`,
      {
        schema: {
          description:
            "A rota /get/:shortUrl retorna a URL original a partir de uma URL curta.",
          tags: [route],
          // params: {
          // $ref: "paramsUrlSchema#",
          // },
          response: {
            200: {
              description: "Successful response",
              $ref: "reply_get_original_url_schema#",
            },
          },
        },
      },
      async (request, reply) => controller.getOriginalUrl(request, reply),
    );
    server.post(
      `/${route}`,
      {
        schema: {
          description:
            "A rota / cria uma URL curta a partir de uma URL original.",
          tags: [route],
          response: {
            201: {
              description: "Successful response",
              $ref: "reply_url_create_schema#",
            },
          },
        },
      },
      async (request, reply) => controller.createShortUrl(request, reply),
    );
  }
}
