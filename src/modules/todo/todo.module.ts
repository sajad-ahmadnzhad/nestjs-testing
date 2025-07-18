import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TodoRepository } from './todo.repository';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService, TodoRepository],
})
export class TodoModule { }
