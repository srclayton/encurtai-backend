import pino from "pino";
export default function createLogger() {
  return pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        colorizeObjects: true,
      },
    },
  });
}
