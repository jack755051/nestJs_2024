import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todoId: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  completed?: boolean;
}
