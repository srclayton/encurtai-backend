import { FastifyReply, FastifyRequest } from "fastify";
import ControllerBase from "./ControllerBase";
import User from "../models/User";
import TokenService from "../services/TokenService";
type UserInput = {
  username: string;
  password: string;
};
export default class UserController extends ControllerBase {
  public async verifyLogin(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as UserInput;
    if (!username || !password) {
      return reply.code(400).send({
        error: "Bad request",
        message: "Login and password are required",
      });
    }
    const result = await this.db.getByField("username", username);
    const resultError = this.verifyContent(result);
    if (resultError) return reply.status(404).send(resultError);

    if (result.password !== password) {
      return reply.code(401).send({
        error: "Unauthorized",
        message: "Wrong password",
      });
    }

    const user = new User(
      result.id,
      result.username,
      result.password,
      result.admin,
    );

    const access_token = await TokenService.generateToken(request.server, user);
    const refresh_token = await TokenService.generateRefreshToken(
      request.server,
      user,
    );
    return reply.code(200).send({
      access_token,
      refresh_token,
    });
  }

  public async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as { sub: string };

    const result = await this.db.getById(sub);
    const resultError = this.verifyContent(result);
    if (resultError) return reply.status(404).send(resultError);

    const user = new User(
      result.id,
      result.username,
      result.password,
      result.admin,
    );
    const access_token = await TokenService.generateToken(request.server, user);
    reply.code(200).send({ access_token });
  }
}
