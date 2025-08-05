import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from '../app/app.service';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TodoModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
