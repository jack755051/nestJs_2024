import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @MinLength(6)
  @MaxLength(120)
  public readonly title: string;

  @IsOptional()
  @MaxLength(225)
  public readonly description?: string;

  @IsOptional()
  public readonly completed?: boolean;
}
