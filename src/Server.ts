import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import dotenv from "dotenv";
import createLogger from "./config/logger";
import { PinoLoggerOptions } from "fastify/types/logger";
import tooManyRequests from "./services/tooManyRequestsService";
import SchemaService from "./services/SchemaService";
import RequestService from "./services/RequestService";
import RouteService from "./services/RouteService";
import ReplyService from "./services/ReplyService";
import JwtService from "./services/JwtService";

export default class Server {
  public static main(server: FastifyInstance) {
    dotenv.config();
    const PORT = process.env.SERVER_PORT
      ? parseInt(process.env.SERVER_PORT)
      : 5541;
    SchemaService.addUrlSchemas(server);
    SchemaService.addUserSchemas(server);

    RequestService.rateLimit(server);
    RouteService.registerRoutes(server);
    ReplyService.onSend(server);
    RequestService.onRequest(server);
    tooManyRequests(server);
    JwtService.RegisterKeys(server);

    // TODO error handling

    const start = async () => {
      try {
        await server.listen({ host: "0.0.0.0", port: PORT });
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    };
    start();

    // export default async (request: FastifyRequest, reply: FastifyReply) => {
    //   await server.ready();
    //   server.server.emit("request", request, reply);
    // };
  }
}
