import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

describe('userController', () => {
  let controller: UserController;
  const userServiceMock = {
    create: jest.fn((dto) => {
      const now = new Date();
      return {
        id: Math.floor(Math.random() * 10000),
        ...dto,
        createdAt: now,
        updatedAt: now,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    findAll: jest.fn().mockImplementation(() => {
      return [
        {
          id: 1,
          firstName: 'sajad',
          lastName: 'ahmadnzhad',
          email: 'ahmadnzhad22@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          firstName: 'abolfazle',
          lastName: 'ahmadnzhad23',
          email: 'ahmadnzhad23@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }),
    findOne: jest
      .fn()
      .mockImplementation((id) => ({ id, ...controller.findAll()[0] })),
  };
  const userRepositoryMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .overrideProvider(UserRepository)
      .useValue(userRepositoryMock)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      email: 'ahmadnzhad23@gmail.com',
      firstName: 'abofazle',
      lastName: 'ahmadnzhad',
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    expect(userServiceMock.create).toHaveBeenCalled();
    expect(userServiceMock.create).toHaveBeenCalledWith(dto);
  });
  it('should update a user', () => {
    const dto: UpdateUserDto = { email: 'ahmadnzhad22@gmail.com' };

    expect(controller.update('1', dto)).toEqual({ id: 1, ...dto });
    expect(userServiceMock.update).toHaveBeenCalled();
    expect(userServiceMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('should find all users list', () => {
    expect(controller.findAll()).toBeDefined();
    expect(controller.findAll()).toHaveLength(2);
    expect(controller.findAll()).toBeInstanceOf(Array);
    expect(userServiceMock.findAll).toHaveBeenCalled();
  });

  it('should find one a user', () => {
    expect(controller.findOne('1')).toEqual({
      id: 1,
      firstName: 'sajad',
      lastName: 'ahmadnzhad',
      email: 'ahmadnzhad22@gmail.com',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(userServiceMock.findOne).toHaveBeenCalled();
    expect(userServiceMock.findOne).toHaveBeenCalledWith(1);
  });
});
