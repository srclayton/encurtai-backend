import { FastifyInstance } from "fastify";
import ControllerBase from "../controllers/ControllerBase";

export default class RouteBase {
  public static async register(
    server: FastifyInstance,
    route: string,
  ): Promise<void> {
    const controller = new ControllerBase(route);

    server.get(
      `/${route}`,
      {
        schema: {
          description: "A rota / retorna todos os registros.",
          tags: [route],
          response: {
            200: {
              description: "Successful response",
              properties: {
                total: { type: "number" },
                hasPrevious: { type: "boolean" },
                hasNext: { type: "boolean" },
                data: {
                  type: "array",
                  items: { $ref: `reply_all_${route}_schema#` },
                },
              },
            },
          },
        },
      },
      async (request, reply) =>
        request.query && Object.keys(request.query).length > 0
          ? controller.getByPage(request, reply)
          : controller.getAll(request, reply),
    );

    server.get(
      `/${route}/:id`,
      {
        schema: {
          description: "A rota /:id retorna um registro a partir de um ID.",
          tags: [route],
          // params: {
          // $ref: "paramsUrlSchema#",
          // },
          response: {
            200: {
              description: "Successful response",
              $ref: `reply_${route}_by_id_schema#`,
            },
          },
        },
      },
      async (request, reply) => controller.getById(request, reply),
    );

    // server.post(`/${route}`, async (request, reply) =>
    //   controller.create(request, reply),
    // );
  }
}
