import { FastifyReply } from "fastify";
import User from "../models/User";
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
export default class TokenService {
  static async generateToken(server: FastifyReply, user: User) {
    const tokenData = {
      sub: user.getId(),
      admin: user.getAdmin(),
    };

    try {
      const token = await server.jwtSign(tokenData, {
        expiresIn: "1h",
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async generateRefreshToken(server: FastifyReply, user: User) {
    const tokenData = {
      iss: JWT_ISSUER,
      aud: JWT_AUDIENCE,
      sub: user.getId(),
    };

    try {
      const token = await server.jwtSign(tokenData, {
        key: {
          private: server.jwtPrivateRefreshKey,
          public: server.jwtPublicRefreshKey,
        },
        expiresIn: "1d",
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
