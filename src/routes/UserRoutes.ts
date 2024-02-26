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
    server.post(
      `/${route}/login`,
      {
        schema: {
          // eslint-disable-next-line
          //@ts-ignore
          description:
            "A rota /login retorna um token de acesso e um token de atualização.",
          tags: [route],
        },
      },
      async (request, reply) => controller.verifyLogin(request, reply),
    );
    // @TODO: ADICIONAR A ROTA REFRESH
    server.post(
      `/${route}/refresh`,
      {
        schema: {
          description: "A rota /refresh retorna um token de acesso.",
          tags: [route],
          response: {
            200: {
              description: "Successful response",
              $ref: `reply_refresh_schema#`,
            },
          },
        },
      },
      async (request, reply) => controller.refreshToken(request, reply),
    );
    server.get(
      `/${route}/hasCookie`,
      {
        schema: {
          // eslint-disable-next-line
          //@ts-ignore
          description:
            "A rota /hasCookie verifica se o usuário possui accessToken.",
          tags: [route],
        },
      },
      async (request, reply) => controller.hasCookie(request, reply),
    );
  }
}
