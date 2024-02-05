import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/typeorm/entities';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';

// import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  //若小於10手動補0
  resetTime(input: any) {
    if (input < 10) {
      const result = '0' + input.toString();
      return result;
    }
    return input;
  }

  setTodoBuildTime(time: Date) {
    const year = time.getFullYear().toString();
    const month = this.resetTime(time.getMonth() + 1);
    const date = this.resetTime(time.getDate());
    const hour = this.resetTime(time.getHours());
    const minute = this.resetTime(time.getMinutes());
    const second = this.resetTime(time.getSeconds());

    const result = year + month + date + hour + minute + second;

    console.log('result', result);
    return result;
  }

  /**
   * 建立代辦清單
   * @param data
   * @returns
   */
  public async createTodo(data: CreateTodoDto) {
    //設定
    const todoId = this.setTodoBuildTime(new Date());

    const newTodo = this.todoRepository.create({
      todoId: todoId,
      title: data.title,
      description: data.description,
      completed: data.completed,
    });

    return this.todoRepository.save(newTodo);
  }

  /**
   * 尋找代辦事項
   * @returns
   */
  public async findTodo() {
    return await this.todoRepository.find();
  }

  //   public async deleteTodo(id:) {}
}
