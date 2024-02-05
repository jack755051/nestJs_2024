import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonUtility } from 'src/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 建立使用者資料
   * @param user
   * @returns
   */
  public async createUser(user: CreateUserDto) {
    //解構傳入的user資料
    const { name, password, email, role } = user;
    //密碼加密
    const { hash, salt } = CommonUtility.encryptBySalt(password);

    //建立使用者
    const newUser = this.userRepository.create({
      name: name,
      uuid: uuidv4(),
      passwordHash: hash,
      passwordSalt: salt,
      email: email,
      role: role,
      createAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  /**
   * 找到所有使用者
   * @returns
   */
  public async findUsers() {
    return await this.userRepository.find();
  }

  /**
   * 找到使用者，透過名字
   * @param name
   * @returns
   */
  public async findUserByName(name: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({ where: { name } });
    return result;
  }

  /**
   * 透過名字判斷是否有使用者
   * @param name
   * @returns
   */
  public async hasUser(name: string): Promise<boolean> {
    const result = await this.userRepository.findOne({ where: { name } });

    if (result) {
      return true;
    } else {
      false;
    }
  }
}
