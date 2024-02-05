import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user';
import { LocalAuthGuard } from 'src/core/guards';
import { User } from './decorators/payload.decorator';
import { UserPayload } from './interfaces/payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() dto: CreateUserDto) {
    const hasUser = await this.userService.hasUser(dto.name);

    //如果已有帳號
    if (hasUser) {
      throw new ForbiddenException();
    }

    const user = await this.userService.createUser(dto);
    const { uuid, name: username, role } = user;
    return this.authService.generateJwt({ uuid, username, role });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(@User() user: UserPayload) {
    return this.authService.generateJwt(user);
  }
}
