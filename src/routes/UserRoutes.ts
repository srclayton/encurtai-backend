import { FastifyInstance } from "fastify";
import RouteBase from "./RouteBase";
import UserController from "../controllers/UserController";

export default class UserRoutes extends RouteBase {
  public static async register(
    server: FastifyInstance,
    route: string,
  ): Promise<void> {
    await super.register(server, route);
    const controller = new UserController(route);
    server.post(`/${route}/login`, async (request, reply) =>
      controller.verifyLogin(request, reply),
    );
  }
}
