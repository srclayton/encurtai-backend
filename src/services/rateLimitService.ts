import fastifyRateLimit from "@fastify/rate-limit";
import { FastifyInstance } from "fastify";

export default async function rateLimitService(server: FastifyInstance) {
  await server.register(fastifyRateLimit, {
    global: true,
    max: 2,
    timeWindow: "1 minute",
  });
  const registeredPlugins = server.printPlugins();
  const registeredRoutes = server.printRoutes();
  server.log.info(
    `registered plugins: \n${registeredPlugins} registered routes: \n${registeredRoutes}`,
  );
}
