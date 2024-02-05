import { Body, Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async createTodo(@Body() dto: CreateTodoDto) {
    if (!dto) {
      return { message: 'Todo not found' };
    }
    return await this.todoService.createTodo(dto);
  }
}
