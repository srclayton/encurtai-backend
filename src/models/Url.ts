export default class Url {
  private originalUrl: string;
  private shortUrl: string;
  private createdAt: Date;

  constructor(
    id: string,
    originalUrl: string,
    shortUrl: string,
    createdAt: Date,
  ) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.createdAt = createdAt;
  }

  getOriginalUrl(): string {
    return this.originalUrl;
  }

  getShortUrl(): string {
    return this.shortUrl;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
