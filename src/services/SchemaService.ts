import { FastifyInstance } from "fastify";
import {
  replyAllUrlSchema,
  replyGetOriginalUrlSchema,
  replyUrlByIdSchema,
  replyUrlCreateSchema,
} from "../schemas/urlSchemas";
import {
  replyUserByIdSchema,
  replyAllUserSchema,
  replyLoginSchema,
  replyRefreshSchema,
} from "../schemas/userSchemas";

export default class SchemaService {
  public static addUrlSchemas(server: FastifyInstance) {
    server.addSchema({
      $id: "reply_get_original_url_schema",
      ...replyGetOriginalUrlSchema,
    });
    server.addSchema({
      $id: "reply_url_create_schema",
      ...replyUrlCreateSchema,
    });
    server.addSchema({
      $id: "reply_all_url_schema",
      ...replyAllUrlSchema,
    });
    server.addSchema({
      $id: "reply_url_by_id_schema",
      ...replyUrlByIdSchema,
    });
  }

  public static addUserSchemas(server: FastifyInstance) {
    server.addSchema({
      $id: "reply_user_by_id_schema",
      ...replyUserByIdSchema,
    });

    server.addSchema({
      $id: "reply_all_user_schema",
      ...replyAllUserSchema,
    });

    server.addSchema({
      $id: "reply_login_schema",
      ...replyLoginSchema,
    });

    server.addSchema({
      $id: "reply_refresh_schema",
      ...replyRefreshSchema,
    });
  }
}
