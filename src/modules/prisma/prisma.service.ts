import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  private readonly logger: Logger = new Logger(PrismaService.name);
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Discounted from database.');
  }
}
