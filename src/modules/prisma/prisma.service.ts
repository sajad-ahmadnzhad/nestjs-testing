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

  async cleanDatabase(){
    if(process.env.NODE_ENV == 'production') return

    const models = Reflect.ownKeys(this).filter(key => key[0] !== "_")

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()))
  }
}
