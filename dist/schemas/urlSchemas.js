"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyUrlCreateSchema = exports.replyUrlCreateSchema = exports.replyUrlByIdSchema = exports.replyAllUrlSchema = exports.replyGetOriginalUrlSchema = void 0;
exports.replyGetOriginalUrlSchema = {
    type: "object",
    properties: {
        originalUrl: {
            type: "string",
            format: "url",
        },
    },
    required: ["originalUrl"],
};
exports.replyAllUrlSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            format: "uuid",
            description: "ID da URL",
        },
        userId: {
            type: "string",
            format: "uuid",
            description: "ID do usuário",
        },
        originalUrl: {
            type: "string",
            format: "url",
            description: "URL original",
        },
    },
    required: ["originalUrl", "userId", "id"],
};
exports.replyUrlByIdSchema = {
    type: "object",
    properties: {
        userId: {
            type: "string",
            format: "uuid",
            description: "ID do usuário",
        },
        originalUrl: {
            type: "string",
            format: "url",
            description: "URL original",
        },
        shortUrl: {
            type: "string",
            format: "url",
            description: "URL curta",
        },
    },
    required: ["shortUrl", "originalUrl", "userId", "id"],
};
exports.replyUrlCreateSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            format: "uuid",
            description: "ID da URL",
        },
        shortUrl: {
            type: "string",
            format: "url",
            description: "URL curta",
        },
    },
    required: ["shortUrl", "originalUrl", "id"],
};
exports.bodyUrlCreateSchema = {
    type: "object",
    properties: {
        originalUrl: {
            type: "string",
            format: "url",
            description: "URL original",
        },
    },
    required: ["originalUrl"],
};
//# sourceMappingURL=urlSchemas.js.map