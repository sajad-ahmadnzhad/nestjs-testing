import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(createTodoDto: CreateTodoDto): Promise<{ message: string; todo: Todo }> {
    const existingTodo = await this.todoRepository.findOne({ where: { title: createTodoDto.title, userId: createTodoDto.userId } });

    if (existingTodo) throw new ConflictException('Already exists todo with this title.');

    const newTodo = await this.todoRepository.create({ data: createTodoDto });

    return { message: 'Created todo successfully.', todo: newTodo };
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    const existingTodo = await this.todoRepository.findOne({ where: { id } });

    if (!existingTodo) throw new NotFoundException('Todo not found.');

    return existingTodo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<{ message: string; todo: Todo }> {
    await this.findOne(id);

    const existingTodo = await this.todoRepository.findOne({
      where: { title: updateTodoDto.title, userId: updateTodoDto.userId, NOT: { id } },
    });

    if (existingTodo) throw new ConflictException('Already exists todo with this title.');

    const updatedTodo = await this.todoRepository.update({ where: { id }, data: updateTodoDto });

    return { message: 'Todo updated successfully.', todo: updatedTodo };
  }

  async remove(id: number): Promise<{ message: string; todo: Todo }> {
    await this.findOne(id);

    const removedTodo = await this.todoRepository.remove({ where: { id } });

    return { message: 'Removed todo successfully', todo: removedTodo };
  }
}
