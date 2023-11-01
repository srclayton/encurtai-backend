import { FastifyReply, FastifyRequest } from "fastify";
import DbAccess from "../database/dbAccess";

export default class ControllerBase {
  protected table: string;
  protected db: DbAccess;

  constructor(table: string, db: DbAccess = new DbAccess(table)) {
    this.table = table;
    this.db = db;
  }

  public verifyContent(content: unknown) {
    if (!content) {
      return {
        error: "Not found",
        message: "Not found records in database.",
      };
    } else return null;
  }

  public async getAll(request: FastifyRequest, reply: FastifyReply) {
    // Get count of all records
    const count = await this.db.getCount();
    // Check if count is valid
    const countError = this.verifyContent(count);
    if (countError) return reply.status(404).send(countError);

    // Get all records
    const result = await this.db.getAll();
    // Check if result is valid
    const resultError = this.verifyContent(result);
    // If result is not valid return error
    if (resultError) return reply.status(404).send(resultError);

    return reply.send({
      total: count,
      data: result,
    });
  }

  public async getById(request: FastifyRequest, reply: FastifyReply) {
    // Destructure id from params
    const { id } = request.params as { id: string };
    // Check if id is valid
    if (!id)
      return reply.status(400).send({
        error: "Bad request",
        message: "Id is required.",
      });

    const result = await this.db.getById(id);
    // Check if result is valid
    const resultError = this.verifyContent(result);
    // If result is not valid return error
    if (resultError) return reply.status(404).send(resultError);
    return reply.send(result);
  }

  public async getByPage(request: FastifyRequest, reply: FastifyReply) {
    // Destructure page and limit from query string
    const { page, limit } = request.query as { page: number; limit: number };
    // Check if page and limit are valid numbers and in valid range
    if (!page || !limit || page < 1 || limit <= 1 || limit > 100) {
      return reply.status(400).send({
        error: "Bad request",
        message: `Page must be > 1 and limit must be > 1 and <= 100. Current values: page: ${page}, limit: ${limit}`,
      });
    }
    // Get count of all records
    const count = await this.db.getCount();
    // Check if count is valid
    const countError = this.verifyContent(count);
    if (countError) return reply.status(404).send(countError);

    // Calculate maxPage
    const maxPage = Math.ceil(count / limit);
    // Check if page is valid
    if (page > maxPage) {
      return reply.status(404).send({
        message: `Page must be <= ${maxPage}. Current value page: ${page}`,
      });
    }

    const result = await this.db.getByPage(page, limit);
    // Check if result is valid
    const resultError = this.verifyContent(result);
    // If result is not valid return error
    if (resultError) return reply.status(404).send(resultError);

    return reply.send({
      hasPrevious: page > 1,
      hasNext: page < maxPage,
      data: result,
    });
  }

  public async create(request: FastifyRequest, reply: FastifyReply) {
    // Destructure body from request
    const { body } = request;

    if (!body)
      return reply.status(400).send({
        error: "Bad request",
        message: "Body is required.",
      });

    const { username } = request.body as { username: string };
    // Check if username is valid
    const checkUsername = await this.db.getByField("username", username);
    console.log(checkUsername);
    if (checkUsername)
      return reply.status(409).send({
        error: "Bad request",
        message: "Username already exists.",
      });
    const result = await this.db.create(body);
    // Check if result is valid
    const resultError = this.verifyContent(result);
    // If result is not valid return error
    if (resultError) return reply.status(404).send(resultError);

    return reply.send(result);
  }
}
