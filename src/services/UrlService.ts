import crypto from "crypto";

export default class UrlService {
  public static generateShortUrl(): string {
    return crypto.randomBytes(8).toString("base64url");
  }
}
