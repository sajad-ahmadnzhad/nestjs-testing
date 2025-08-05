import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const existingUser = await this.userRepository.findOne({
      where: { firstName: createUserDto.firstName },
    });

    if (existingUser)
      throw new ConflictException('Already exists user with this firstName.');

    const newUser = await this.userRepository.create({
      data: { ...createUserDto },
    });

    return { message: 'Created user successfully.', user: newUser };
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: number): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) throw new NotFoundException('User not found.');

    return existingUser;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    await this.findOne(id);

    const existingUser = await this.userRepository.findOne({
      where: { firstName: updateUserDto.firstName, NOT: { id } },
    });

    if (existingUser)
      throw new ConflictException('Already exists user with this firstName.');

    const updatedUser = await this.userRepository.update({
      where: { id },
      data: updateUserDto,
    });

    return { message: 'User updated successfully.', user: updatedUser };
  }

  async remove(id: number): Promise<{ message: string; user: User }> {
    await this.findOne(id);

    const removedUser = await this.userRepository.remove({ where: { id } });

    return { message: 'Removed user successfully', user: removedUser };
  }
}
