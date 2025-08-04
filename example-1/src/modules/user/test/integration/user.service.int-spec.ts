import { Test } from "@nestjs/testing"
import { AppModule } from "src/modules/app/app.module"
import { UserService } from "../../user.service"
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { HttpStatus } from "@nestjs/common";

describe("UserService Int", () => {
    let userService: UserService;
    let prismaService: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        userService = moduleRef.get(UserService)
        prismaService = moduleRef.get(PrismaService)
        await prismaService.cleanDatabase()
    })

    it('should be defined', () => {
        expect(userService).toBeDefined()
        expect(prismaService).toBeDefined()
    })

    describe('createUser()', () => {
        const dto: CreateUserDto = { email: "test@test.com", firstName: "john", lastName: "conner" }
        it('should create user', async () => {
            const user = await userService.create(dto)

            expect(user.user.email).toBe(dto.email)
            expect(user.user.firstName).toBe(dto.firstName)
            expect(user.user.lastName).toBe(dto.lastName)
            expect(user.message).toMatch('Created user')
        })

        it('should throw error when duplicate user provided.', async () => {

            try {
                const user = await userService.create(dto);
                expect(user).toBeUndefined()
            } catch (error) {
                expect(error.message).toMatch('Already exists')
                expect(error.status).toBe(HttpStatus.CONFLICT)
            }

        })
    })
})