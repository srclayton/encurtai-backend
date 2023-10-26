import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { readFileSync } from "node:fs";
import path from "node:path";

export default async function jwtRegisterService(server: FastifyInstance) {
  const PATCH_JWT_PRIVATE_SIGN_KEY = process.env.JWT_PRIVATE_SIGN_KEY_FILE;
  const PATCH_JWT_PUBLIC_SIGN_KEY = process.env.JWT_PUBLIC_SIGN_KEY_FILE;
  const PATCH_JWT_PRIVATE_REFRESH_KEY =
    process.env.JWT_PRIVATE_REFRESH_KEY_FILE;
  const PATCH_JWT_PUBLIC_REFRESH_KEY = process.env.JWT_PUBLIC_REFRESH_KEY_FILE;
  if (
    !PATCH_JWT_PRIVATE_SIGN_KEY ||
    !PATCH_JWT_PUBLIC_SIGN_KEY ||
    !PATCH_JWT_PRIVATE_REFRESH_KEY ||
    !PATCH_JWT_PUBLIC_REFRESH_KEY
  ) {
    throw new Error("JWT key file path not found");
  }

  try {
    const jwtPrivateSignKey = readFileSync(
      path.resolve(__dirname, PATCH_JWT_PRIVATE_SIGN_KEY),
      "utf8",
    );
    const jwtPublicSignKey = readFileSync(
      path.resolve(__dirname, PATCH_JWT_PUBLIC_SIGN_KEY),
      "utf8",
    );
    server.decorate(
      "PATCH_JWT_PRIVATE_REFRESH_KEY",
      PATCH_JWT_PRIVATE_REFRESH_KEY,
    );

    server.decorate(
      "PATCH_JWT_PUBLIC_REFRESH_KEY",
      PATCH_JWT_PUBLIC_REFRESH_KEY,
    );

    server.register(jwt, {
      secret: {
        private: jwtPrivateSignKey,
        public: jwtPublicSignKey,
      },
      sign: { algorithm: "RS256" },
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
