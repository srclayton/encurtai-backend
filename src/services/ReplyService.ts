import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default class ReplyService {
  public static onSend(server: FastifyInstance) {
    server.addHook(
      "onSend",
      (
        request: FastifyRequest,
        reply: FastifyReply,
        payload: JSON,
        done: () => void,
      ) => {
        reply.headers({
          "X-Content-Type": "application/json",
          "X-Frame-Options": "deny",
          "Content-Security-Policy": "default-src 'none'",
          Connection: "close",
        });
        reply.removeHeader("X-Powered-By");
        reply.removeHeader("Server");
        reply.removeHeader("x-content-type");
        done();
      },
    );
  }
}
