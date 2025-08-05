import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';

describe('TodoController', () => {
  let controller: TodoController;
  const todoServiceMock = {};
  const todoRepositoryMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    })
      .overrideProvider(TodoService)
      .useValue(todoServiceMock)
      .overrideProvider(TodoRepository)
      .useValue(todoRepositoryMock)
      .compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
