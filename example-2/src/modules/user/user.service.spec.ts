import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service"
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

describe("UserService", () => {
    let service: UserService;

    const mockUserRepository = {
        create: jest.fn().mockImplementation((args) => {
            return { id: Math.floor(Math.random() * 10000), ...args.data, createdAt: new Date(), updatedAt: new Date() };
        }),
        findOne: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, { provide: UserRepository, useValue: mockUserRepository }]
        }).compile()

        service = module.get(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create a new user record and return that', async () => {
        const dto: CreateUserDto = { email: "ahmadnzhad22@gmail.com", firstName: "sajad", lastName: 'ahmadnzhad' };
        expect((await service.create(dto)).message).toMatch('Created');
        expect((await service.create(dto)).user).toEqual({ id: expect.any(Number), ...dto, createdAt: expect.any(Date), updatedAt: expect.any(Date) })
        expect(mockUserRepository.create).toHaveBeenCalledWith({ data: { ...dto } })
        expect(mockUserRepository.findOne).toHaveBeenCalled();
    })
})