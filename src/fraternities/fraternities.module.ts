import { HttpModule, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TokensService } from '../auth/tokens.service';
import { Fraternity } from './models/fraternity.model';
import { FraternitiesResolver } from './fraternities.resolver';
import { FraternitiesService } from './fraternities.service';
import { GoogleRecaptchaV3Constraint } from '../shared/constraints/google-recaptcha-v3.constraint';
import { RecaptchaService } from '../shared/recaptcha.service';
import { AccessTokenStrategy } from '../auth/guards/access-token.guard';

@Module({
  imports: [TypegooseModule.forFeature([Fraternity]), HttpModule],
  providers: [
    FraternitiesResolver,
    FraternitiesService,
    TokensService,
    GoogleRecaptchaV3Constraint,
    RecaptchaService,
    AccessTokenStrategy,
  ],
})
export class FraternitiesModule {}
