export default class Url {
  private originalUrl: string;
  private shortUrl: string;
  private userId: string;

  constructor(originalUrl: string, shortUrl: string, userId: string) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.userId = userId;
  }

  getOriginalUrl(): string {
    return this.originalUrl;
  }

  getShortUrl(): string {
    return this.shortUrl;
  }
}
