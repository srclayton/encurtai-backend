"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlSchemas_1 = require("../schemas/urlSchemas");
const userSchemas_1 = require("../schemas/userSchemas");
class SchemaService {
    static addUrlSchemas(server) {
        server.addSchema(Object.assign({ $id: "reply_get_original_url_schema" }, urlSchemas_1.replyGetOriginalUrlSchema));
        server.addSchema(Object.assign({ $id: "reply_url_create_schema" }, urlSchemas_1.replyUrlCreateSchema));
        server.addSchema(Object.assign({ $id: "reply_all_url_schema" }, urlSchemas_1.replyAllUrlSchema));
        server.addSchema(Object.assign({ $id: "reply_url_by_id_schema" }, urlSchemas_1.replyUrlByIdSchema));
    }
    static addUserSchemas(server) {
        server.addSchema(Object.assign({ $id: "reply_user_by_id_schema" }, userSchemas_1.replyUserByIdSchema));
        server.addSchema(Object.assign({ $id: "reply_all_user_schema" }, userSchemas_1.replyAllUserSchema));
        server.addSchema(Object.assign({ $id: "reply_login_schema" }, userSchemas_1.replyLoginSchema));
        server.addSchema(Object.assign({ $id: "reply_refresh_schema" }, userSchemas_1.replyRefreshSchema));
    }
}
exports.default = SchemaService;
//# sourceMappingURL=SchemaService.js.map