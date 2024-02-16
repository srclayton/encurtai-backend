import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { readFileSync } from "node:fs";
import path from "node:path";
export default class JwtService {
  public static async RegisterKeys(server: FastifyInstance) {
    const PATH_JWT_PRIVATE_SIGN_KEY = process.env.JWT_PRIVATE_SIGN_KEY_FILE;
    const PATH_JWT_PUBLIC_SIGN_KEY = process.env.JWT_PUBLIC_SIGN_KEY_FILE;
    const PATH_JWT_PRIVATE_REFRESH_KEY =
      process.env.JWT_PRIVATE_REFRESH_KEY_FILE;
    const PATH_JWT_PUBLIC_REFRESH_KEY = process.env.JWT_PUBLIC_REFRESH_KEY_FILE;
    if (
      !PATH_JWT_PRIVATE_SIGN_KEY ||
      !PATH_JWT_PUBLIC_SIGN_KEY ||
      !PATH_JWT_PRIVATE_REFRESH_KEY ||
      !PATH_JWT_PUBLIC_REFRESH_KEY
    ) {
      throw new Error("JWT key file path not found");
    }

    try {
      const jwtPrivateSignKey = readFileSync(
        path.resolve(__dirname, PATH_JWT_PRIVATE_SIGN_KEY),
        "utf8",
      );
      const jwtPublicSignKey = readFileSync(
        path.resolve(__dirname, PATH_JWT_PUBLIC_SIGN_KEY),
        "utf8",
      );
      const jwtPrivateRefreshKey = readFileSync(
        path.resolve(__dirname, PATH_JWT_PRIVATE_REFRESH_KEY),
        "utf8",
      );
      const jwtPublicRefreshKey = readFileSync(
        path.resolve(__dirname, PATH_JWT_PUBLIC_REFRESH_KEY),
        "utf8",
      );
      server.decorate("jwtPrivateRefreshKey", jwtPrivateRefreshKey);
      server.decorate("jwtPublicRefreshKey", jwtPublicRefreshKey);

      server.register(jwt, {
        secret: {
          private: jwtPrivateSignKey,
          public: jwtPublicSignKey,
        },
        sign: { algorithm: "RS256" },
        cookie: {
          cookieName: "accessToken", // optional, by default is 'jwt'
          signed: true, // optional, by default is true
        },
      });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  }
}
