import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_PUBLIC,
    });
  }

  async validate(payload: JwtPayload) {
    const { id, access } = payload;
    if (access !== 'full') {
      throw new UnauthorizedException();
    }
    return id;
  }
}

@Injectable()
export class GqlAccessTokenGuard extends AuthGuard('accessToken') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
