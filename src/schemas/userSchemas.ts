export const replyAllUserSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      description: "ID do usuário",
    },
    username: {
      type: "string",
      format: "username",
      description: "Username do usuário",
    },
    admin: {
      type: "boolean",
      description: "Se o usuário é admin",
    },
  },
  required: ["id", "username", "admin"],
};
export const replyUserByIdSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      format: "username",
      description: "Username do usuário",
    },
    admin: {
      type: "boolean",
      description: "Se o usuário é admin",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Data de criação",
    },
  },
  required: ["id", "username", "admin"],
};
export const replyLoginSchema = {
  type: "object",
  properties: {
    access_token: {
      type: "string",
      description: "Token de acesso",
    },
    refresh_token: {
      type: "string",
      description: "Token de atualização",
    },
  },
  required: ["access_token", "refresh_token"],
};
export const replyRefreshSchema = {
  type: "object",
  properties: {
    access_token: {
      type: "string",
      description: "Token de acesso",
    },
  },
  required: ["access_token"],
};
