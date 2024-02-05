import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @MaxLength(60)
  @MinLength(3)
  public readonly name: string;

  @MinLength(3)
  @MaxLength(125)
  public readonly password: string;

  @IsNotEmpty()
  public readonly email: string;

  public readonly role: Role;
}
