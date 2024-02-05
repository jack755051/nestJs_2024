import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CommonUtility } from 'src/core/util';

import { UserPayload } from './interfaces/payload.interface';

import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * 驗證是否為合法的使用者
   * @param username
   * @param password
   * @returns
   */
  public async validateUser(username: string, password: string) {
    //透過findUserByName取得使用者資料
    const user = await this.userService.findUserByName(username);
    //先將輸入密碼執行加密
    const { hash } = CommonUtility.encryptBySalt(password, user.passwordSalt);

    if (!user || hash !== user.passwordHash) {
      return null;
    } else {
      return user;
    }
  }

  /**
   * 產生 JWT 讓使用者可以透過該 token 存取資源
   * @param payload
   * @returns
   */
  public async generateJwt(payload: UserPayload) {
    return { access_token: this.jwtService.sign(payload) };
  }
}
