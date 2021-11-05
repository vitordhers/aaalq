import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  MinLength,
  IsBoolean,
  IsNumber,
  ValidateIf,
  Equals,
  IsDefined,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { GoogleRecaptchaV3 } from '../../../shared/constraints/google-recaptcha-v3.constraint';
import { Communication } from './communication.input';
import { CreateFraternityInput } from 'src/fraternities/dto/input/create-fraternity.input';
import { Types } from 'mongoose';

@InputType()
export class CreateUserInput {
  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(8, 30)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
  password: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  name: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @GoogleRecaptchaV3({ message: 'Recaptcha failed!' })
  recaptcha: string;

  @Field()
  @IsDefined()
  @IsBoolean()
  @Equals(true)
  terms: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  nickname?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(15)
  celphoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  whatsapp?: boolean;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  freshmanYear?: number;

  @Field((type) => ID, { nullable: true })
  @IsOptional()
  fraternityId?: string;

  @Field((type) => CreateFraternityInput, { nullable: true })
  @ValidateIf((o) => !o.fraternityId)
  @IsOptional()
  @ValidateNested()
  fraternity?: CreateFraternityInput;

  @Field((type) => Communication, { nullable: true })
  @ValidateIf((o) => o.promo === true)
  @IsOptional()
  @Transform(({ value, obj }) => {
    if (
      obj.whatsapp === false ||
      (obj.celphoneNumber && obj.celphoneNumber.length < 15)
    ) {
      delete value.wpp;
    }
    return { ...value };
  })
  @ValidateNested()
  communication?: Communication;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  promo?: boolean;
}
