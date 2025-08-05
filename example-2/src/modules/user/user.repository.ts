import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.UserCreateArgs): Promise<User> {
    return this.prisma.user.create(args);
  }

  findOne(args: Prisma.UserFindFirstArgs = {}): Promise<User | null> {
    return this.prisma.user.findFirst(args);
  }

  findAll(args: Prisma.UserFindManyArgs = {}): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  remove(args: Prisma.UserDeleteArgs): Promise<User> {
    return this.prisma.user.delete(args);
  }

  update(args: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(args);
  }
}
