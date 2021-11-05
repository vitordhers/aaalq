import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { GoogleRecaptchaV3 } from '../../../shared/constraints/google-recaptcha-v3.constraint';

@ArgsType()
export class SignInArgs {
  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @GoogleRecaptchaV3()
  recaptcha: string;
}
