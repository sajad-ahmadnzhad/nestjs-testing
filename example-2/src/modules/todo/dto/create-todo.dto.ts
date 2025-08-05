import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
