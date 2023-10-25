import { PrismaClient } from "@prisma/client";
import { prisma } from "../lib/prisma";

export default class DbAccess {
  protected table: string;
  protected db: PrismaClient;
  // eslint-disable-next-line
  // @ts-ignore @TODO: Fix this
  constructor(table: string, db: PrismaClient = prisma) {
    this.table = table;
    this.db = db;
  }

  public async getAll() {
    try {
      // eslint-disable-next-line
      // @ts-ignore @TODO: Fix this 
      const result = await this.db[this.table].findMany();
      return result;
    } catch (err) {
      throw new Error(`Error getting data from database: ${err}`);
    }
  }

  public async getById(id: string) {
    try {
      // eslint-disable-next-line
      // @ts-ignore @TODO: Fix this 
      const result = await this.db[this.table].findUnique({
        where: { id },
      });
      return result;
    } catch (err) {
      throw new Error(`Error getting data from database: ${err}`);
    }
  }

  public async getByPage(page: number, limit: number) {
    try {
      // eslint-disable-next-line
      // @ts-ignore @TODO: Fix this 
      const result = await this.db[this.table].findMany({
        skip: (page - 1) * limit,
        // eslint-disable-next-line
      // @ts-ignore @TODO: Fix this 
        take: parseInt(limit),
      });
      return result;
    } catch (err) {
      throw new Error(`Error getting data from database: ${err}`);
    }
  }

  public async getByField(field: string, value: string) {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const result = await this.db[this.table].findUnique({
        where: { [field]: value },
      });
      return result;
    } catch (err) {
      throw new Error(`Error getting data from database: ${err}`);
    }
  }

  public async getCount() {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const result = await this.db[this.table].count();
      return result;
    } catch (err) {
      throw new Error(`Error getting data from database: ${err}`);
    }
  }

  public async create(data: unknown) {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const result = await this.db[this.table].create({
        data,
      });
      return result;
    } catch (err) {
      throw new Error(`Error creating data in database: ${err}`);
    }
  }

  public async update(id: string, data: unknown) {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const result = await this.db[this.table].update({
        where: { id },
        data,
      });
      return result;
    } catch (err) {
      throw new Error(`Error updating data in database: ${err}`);
    }
  }

  public async delete(id: string) {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      const result = await this.db[this.table].delete({
        where: { id },
      });
      return result;
    } catch (err) {
      throw new Error(`Error deleting data in database: ${err}`);
    }
  }
}
