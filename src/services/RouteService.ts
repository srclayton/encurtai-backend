import { FastifyInstance } from "fastify";
import UserRoutes from "../routes/UserRoutes";
import UrlRoutes from "../routes/UrlRoutes";

export default class RouteService {
  public static registerRoutes(server: FastifyInstance) {
    server.register(() => UserRoutes.register(server, "user"));
    server.register(() => UrlRoutes.register(server, "url"));
  }
}
