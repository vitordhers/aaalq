import { HttpModule, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TokensService } from './tokens.service';
import { User } from '../users/models/user.model';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './guards/access-token.guard';
import { RefreshTokenStrategy } from './guards/refresh-token.guard';
import { GoogleRecaptchaV3Constraint } from '../shared/constraints/google-recaptcha-v3.constraint';
import { RecaptchaService } from '../shared/recaptcha.service';

@Module({
  imports: [TypegooseModule.forFeature([User]), HttpModule],
  providers: [
    AuthResolver,
    AuthService,
    TokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RecaptchaService,
    GoogleRecaptchaV3Constraint,
  ],
})
export class AuthModule {}
