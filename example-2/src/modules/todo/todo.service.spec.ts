import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, TodoRepository, PrismaService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
