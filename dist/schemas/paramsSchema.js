"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsLoginSchema = exports.paramsGetByIdSchema = void 0;
exports.paramsGetByIdSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            format: "uuid",
            description: "ID do registro",
        },
    },
    required: ["id"],
};
exports.paramsLoginSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            description: "Nome do usuário",
        },
        password: {
            type: "string",
            description: "Senha do usuário",
        },
    },
    required: ["username", "password"],
};
//# sourceMappingURL=paramsSchema.js.map