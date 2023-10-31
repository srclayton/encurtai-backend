import { FastifyInstance } from "fastify";
import { replyUrlSchema } from "../schemas/urlSchemas";

export default class SchemaService {
  public static addSchemas(server: FastifyInstance) {
    server.addSchema({
      $id: "replyUrlSchema",
      ...replyUrlSchema,
    });
  }
}
