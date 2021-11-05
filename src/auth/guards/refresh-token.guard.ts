import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh-token'),
      secretOrKey: process.env.REFRESH_TOKEN_PUBLIC,
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}

@Injectable()
export class GqlRefreshTokenGuard extends AuthGuard('refreshToken') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
