import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { UserPayload } from '../interfaces/payload.interface';
import { PassportStrategy } from '@nestjs/passport';

/**
 * 登入期間的驗證策略，針對 JWT 的驗證
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secrets.jwt'),
    });
  }

  validate(payload: UserPayload) {
    return payload;
  }
}
