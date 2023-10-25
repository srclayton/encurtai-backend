import Fastify, { FastifyInstance } from "fastify";
import dotenv from "dotenv";
import createLogger from "./config/logger";
import rateLimitService from "./services/rateLimitService";
import routesService from "./services/routesService";
import { PinoLoggerOptions } from "fastify/types/logger";
import onSendService from "./services/onSendService";
import tooManyRequests from "./services/tooManyRequestsService";
import jwtRegisterService from "./services/jwtRegisterService";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5541;
const logger: PinoLoggerOptions = createLogger();
const server: FastifyInstance = Fastify({
  logger: true,
});

rateLimitService(server);
routesService(server);
onSendService(server);
tooManyRequests(server);
jwtRegisterService(server);

// TODO error handling
const start = async () => {
  try {
    await server.listen({ port: PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
export default server;
