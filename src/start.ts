import fastify, { FastifyInstance } from "fastify";
import Server from "./Server";
import { PinoLoggerOptions } from "fastify/types/logger";
import createLogger from "./config/logger";
import dotenv from "dotenv";
dotenv.config();
const NODE_ENV = process.env.NODE_ENV;

const loggerOptions: PinoLoggerOptions | boolean =
  NODE_ENV === "development" ? createLogger() : true;
const server: FastifyInstance = fastify({ logger: loggerOptions });
server.decorate("NODE_ENV", NODE_ENV);
Server.main(server);
