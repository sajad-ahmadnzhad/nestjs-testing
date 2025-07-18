import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [PrismaModule, TodoModule, UserModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
