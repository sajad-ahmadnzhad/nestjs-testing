import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.TodoCreateArgs): Promise<Todo> {
    return this.prisma.todo.create(args);
  }

  findOne(args: Prisma.TodoFindFirstArgs = {}): Promise<Todo | null> {
    return this.prisma.todo.findFirst(args);
  }

  findAll(args: Prisma.TodoFindManyArgs = {}): Promise<Todo[]> {
    return this.prisma.todo.findMany(args);
  }

  remove(args: Prisma.TodoDeleteArgs): Promise<Todo> {
    return this.prisma.todo.delete(args);
  }

  update(args: Prisma.TodoUpdateArgs): Promise<Todo> {
    return this.prisma.todo.update(args);
  }
}
