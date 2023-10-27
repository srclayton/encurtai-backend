import { FastifyInstance } from "fastify";
import User from "../models/User";
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
      const token = server.jwt.sign(tokenData, {
        // eslint-disable-next-line
        //@ts-ignore
        key: server.jwtPrivateRefreshKey,
        // eslint-disable-next-line
        //@ts-ignore
        publicKey: server.jwtPublicRefreshKey,
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
