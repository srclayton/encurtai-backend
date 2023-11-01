export const replyGetOriginalUrlSchema = {
  type: "object",
  properties: {
    originalUrl: {
      type: "string",
      format: "url",
    },
  },
  required: ["originalUrl"],
};
export const replyAllUrlSchema = {
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
export const replyUrlByIdSchema = {
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
export const replyUrlCreateSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "ID da URL",
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
  required: ["shortUrl", "originalUrl", "id"],
};
export const bodyUrlCreateSchema = {
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
