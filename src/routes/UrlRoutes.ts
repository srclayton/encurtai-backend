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
    server.get(`/${route}/get/:shortUrl`, async (request, reply) =>
      controller.getOriginalUrl(request, reply),
    );
    server.post(`/${route}`, async (request, reply) =>
      controller.createShortUrl(request, reply),
    );
  }
}
