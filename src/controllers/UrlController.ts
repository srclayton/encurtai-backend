import { FastifyRequest, FastifyReply } from "fastify";
import ControllerBase from "./ControllerBase";
import UrlService from "../services/UrlService";
import Url from "../models/Url";

export default class UrlController extends ControllerBase {
  public async getOriginalUrl(request: FastifyRequest, reply: FastifyReply) {
    const { shortUrl } = request.params as { shortUrl: string };

    const result = await this.db.getByField("shortUrl", shortUrl);
    const resultError = this.verifyContent(result);
    if (resultError) return reply.code(404).send(resultError);
    return reply.send(result);
  }

  public async createShortUrl(request: FastifyRequest, reply: FastifyReply) {
    const { originalUrl } = request.body as { originalUrl: string };

    if (!originalUrl) {
      return reply.code(400).send({
        error: "Bad request",
        message: "Original URL is required",
      });
    }
    let shortUrl, result;
    do {
      shortUrl = UrlService.generateShortUrl();
      result = await this.db.getByField("shortUrl", shortUrl);
    } while (result);
    const url = new Url(
      originalUrl,
      shortUrl,
      // eslint-disable-next-line
      // @ts-ignore
      request.user.sub,
    );
    const newUrl = await this.db.create(url);

    return reply.code(201).send(newUrl);
  }
}
