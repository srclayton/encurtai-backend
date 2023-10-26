import { FastifyInstance } from "fastify";
import User from "../models/User";
import { readFileSync } from "fs";
import path from "path";
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
export default class TokenService {
  static async generateToken(server: FastifyInstance, user: User) {
    const tokenData = {
      sub: user.getId(),
      admin: user.getAdmin(),
    };

    try {
      const token = await server.jwt.sign(tokenData, {
        expiresIn: "1h",
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async generateRefreshToken(server: FastifyInstance, user: User) {
    const tokenData = {
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      sub: user.getId(),
    };
    try {
      // eslint-disable-next-line
      //@ts-ignore
      const pathJwtPublicRefreshKey = server.PATCH_JWT_PUBLIC_REFRESH_KEY;
      // eslint-disable-next-line
      //@ts-ignore
      const pathJwtPrivateRefreshKey = server.PATCH_JWT_PRIVATE_REFRESH_KEY;

      if (!pathJwtPublicRefreshKey || !pathJwtPrivateRefreshKey) {
        throw new Error("JWT key file path not found");
      }
      const jwtPublicRefreshKey = readFileSync(
        path.resolve(__dirname, pathJwtPublicRefreshKey),
      );
      const jwtPrivateRefreshKey = readFileSync(
        path.resolve(__dirname, pathJwtPrivateRefreshKey),
      );

      const token = server.jwt.sign(tokenData, {
        // eslint-disable-next-line
        //@ts-ignore
        key: jwtPrivateRefreshKey.toString(),
        publicKey: jwtPublicRefreshKey.toString(),
        algorithm: "RS256",
        expiresIn: "1d",
      });

      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
