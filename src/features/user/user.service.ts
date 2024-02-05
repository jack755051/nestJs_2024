import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CommonUtility } from 'src/core/util';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

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

  /**
   * 刪除使用者透過uuid
   * @param uuid
   * @returns
   */
  public async deleteUser(uuid: string) {
    const _uuid = uuid;
    return await this.userRepository.delete({ uuid: _uuid });
  }

  /**
   * 更新使用者資訊
   * @param uuid
   * @param dto
   * @returns
   */
  public async updateUser(uuid: string, dto: UpdateUserDto) {
    //找到使用者
    const user = await this.userRepository.findOne({ where: { uuid } });
    //重新設定密碼
    //若新密碼跟舊密碼一樣
    const { hash, salt } = CommonUtility.encryptBySalt(dto.password);

    if (hash === user.passwordHash) {
      return { oData: '你的新密碼與舊密碼相同' };
    }

    const newUser: UserEntity = {
      ...user,
      name: dto.name,
      passwordHash: hash,
      passwordSalt: salt,
      email: dto.email,
      role: dto.role,
    };

    return await this.userRepository.save(newUser);
  }
}
