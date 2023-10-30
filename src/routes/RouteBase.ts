import { FastifyInstance } from "fastify";
import ControllerBase from "../controllers/ControllerBase";

export default class RouteBase {
  public static async register(
    server: FastifyInstance,
    route: string,
  ): Promise<void> {
    const controller = new ControllerBase(route);

    server.get(`/${route}`, async (request, reply) =>
      request.query && Object.keys(request.query).length > 0
        ? controller.getByPage(request, reply)
        : controller.getAll(request, reply),
    );

    server.get(`/${route}/:id`, async (request, reply) =>
      controller.getById(request, reply),
    );

    // server.post(`/${route}`, async (request, reply) =>
    //   controller.create(request, reply),
    // );
  }
}
