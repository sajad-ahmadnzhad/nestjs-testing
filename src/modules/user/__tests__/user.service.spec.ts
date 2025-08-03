import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import prismaMock from 'prisma-mock'

const mockUserRepository = {
  create: jest.fn()
}

describe('UserService (Unit)', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
