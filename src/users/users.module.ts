import { HttpModule, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TokensService } from 'src/auth/tokens.service';
import { User } from './models/user.model';
import { GoogleRecaptchaV3Constraint } from '../shared/constraints/google-recaptcha-v3.constraint';
import { RecaptchaService } from '../shared/recaptcha.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { AccessTokenStrategy } from '../auth/guards/access-token.guard';
import { Fraternity } from '../fraternities/models/fraternity.model';
import { FraternitiesService } from '../fraternities/fraternities.service';
import { DateScalar } from '../shared/scalars/date.scalar';

@Module({
  imports: [TypegooseModule.forFeature([User, Fraternity]), HttpModule],
  providers: [
    UsersResolver,
    UsersService,
    TokensService,
    GoogleRecaptchaV3Constraint,
    RecaptchaService,
    AccessTokenStrategy,
    FraternitiesService,
    DateScalar,
  ],
})
export class UsersModule {}
