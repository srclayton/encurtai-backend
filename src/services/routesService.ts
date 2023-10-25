import { FastifyInstance } from "fastify";
import RouteBase from "../routes/RouteBase";
import UserRoutes from "../routes/UserRoutes";

export default function routesService(server: FastifyInstance) {
  server.register(() => UserRoutes.register(server, "user"));
  server.register(() => RouteBase.register(server, "url"));

  // server.register();
}
