import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: jwtConstants.secret,
       });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    if (!payload.userId) {
      throw new UnauthorizedException();
    }

    const user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      isAdmin: payload.isAdmin,
    };

    return user;
  }
}
