import { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import SchemaService from "./services/SchemaService";
import RequestService from "./services/RequestService";
import RouteService from "./services/RouteService";
import ReplyService from "./services/ReplyService";
import JwtService from "./services/JwtService";
import ErrorHandler from "./services/ErrorHandler";
export default class Server {
  public static main(server: FastifyInstance) {
    dotenv.config();
    const PORT = process.env.SERVER_PORT
      ? parseInt(process.env.SERVER_PORT)
      : 5541;
    const ORIGIN = process.env.CORS_ORIGIN?.split(",");
    server.decorate("ORIGIN", ORIGIN);
    RequestService.registerCorsAndCookie(server);

    SchemaService.addUrlSchemas(server);
    SchemaService.addUserSchemas(server);

    RequestService.rateLimit(server);
    RouteService.registerRoutes(server);
    ReplyService.onSend(server);
    RequestService.onRequest(server);
    ErrorHandler.setErrorHandler(server);
    JwtService.RegisterKeys(server);

    const start = async () => {
      try {
        await server.listen({ host: "0.0.0.0", port: PORT });
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    };
    start();
  }
}
