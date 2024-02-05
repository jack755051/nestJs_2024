import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.findUsers();
  }

  @Post('create')
  async createUser(@Body() dto: CreateUserDto) {
    if (!dto) {
      return { message: 'User not found' };
    }
    return await this.userService.createUser(dto);
  }

  @Delete(':uuid')
  async deleteUser(@Param() uuid: string) {
    return await this.userService.deleteUser(uuid);
  }

  @Patch(':uuid')
  async updateUser(@Param() uuid: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser(uuid, dto);

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
