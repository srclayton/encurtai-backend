export const paramsGetByIdSchema = {
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

export const paramsLoginSchema = {
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
