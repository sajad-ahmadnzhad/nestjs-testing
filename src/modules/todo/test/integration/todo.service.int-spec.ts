import { Test } from "@nestjs/testing"
import { AppModule } from "src/modules/app/app.module"
import { PrismaService } from "src/modules/prisma/prisma.service"
import { TodoService } from "../../todo.service";
import { CreateTodoDto } from "../../dto/create-todo.dto";
import { HttpStatus } from "@nestjs/common";

describe("TodoService Int", () => {
    let prisma: PrismaService;
    let todoService: TodoService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        prisma = moduleRef.get(PrismaService)
        todoService = moduleRef.get(TodoService)
        await prisma.cleanDatabase()
    })

    describe('createTodo()', () => {
        const dto: CreateTodoDto = { userId: 1, title: "myTask", description: "This is a task" }

        it('should create user', async () => {
            const user = await prisma.user.create({
                data: {
                    email: "test@test.com",
                    firstName: "john",
                    lastName: "conner",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
            dto.userId = user.id
        })

        it('should create todo', async () => {
            const todo = await todoService.create(dto)


            expect(todo).toBeDefined()
            expect(todo.todo.title).toBe(dto.title)
            expect(todo.todo.description).toBe(dto.description);
        })

        it('should throw error when duplicate title provided.',  () => {
            todoService.create(dto).catch(err => {
                expect(err.status).toBe(HttpStatus.CONFLICT)
                expect(err.message).toMatch('Already exists')
            }).then((data) => expect(data).toBeUndefined())
        })
    })

})