import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  MinLength,
  IsBoolean,
  IsNumberString,
  ValidateIf,
  IsDefined,
} from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field(() => ID)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  _id!: string;

  //   @Field()
  //   @IsDefined()
  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(4, 50)
  //   name?: string;

  //   @Field()
  //   @IsOptional()
  //   @IsNotEmpty()
  //   @IsString()
  //   @Length(1, 50)
  //   nickname?: string;

  //   @Field()
  //   @IsOptional()
  //   @IsString()
  //   @MinLength(15)
  //   celphoneNumber?: string;

  //   @Field()
  //   @IsOptional()
  //   @IsBoolean()
  //   whatsapp?: boolean;

  //   @Field()
  //   @IsOptional()
  //   @IsNumberString()
  //   freshmanYear?: number;

  //   @Field()
  //   @IsOptional()
  //   @IsString()
  //   fraternity?: string;

  //   @Field()
  //   @ValidateIf((o) => o.promo === true)
  //   @IsOptional()
  //   @IsBoolean({ each: true })
  //   communication?: { mail: boolean; wpp: boolean };

  //   @Field()
  //   @IsOptional()
  //   @IsBoolean()
  //   promo?: boolean;

  //   @Field()
  //   @IsOptional()
  //   @IsString()
  //   @IsNotEmpty()
  //   currentAvatar?: string;

  //   @Field()
  //   @IsOptional()
  //   @IsString({ each: true })
  //   @IsNotEmpty({ each: true })
  //   images?: string[];

  // sports?: Sport[];
  // medals?: Medal[];
}
