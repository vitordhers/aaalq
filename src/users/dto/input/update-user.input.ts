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
import { Communication } from './communication.input';
// import { Transform } from 'class-transformer';

@InputType()
export class UpdateUserInput {
  @Field((type) => ID)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @Field({ nullable: true })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(4, 50)
  name?: string;

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

  @Field({ nullable: true })
  @IsOptional()
  @IsNumberString()
  freshmanYear?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fraternity?: string;

  @Field((type) => Communication, { nullable: true })
  @ValidateIf((object) => object.promo === true)
  @IsOptional()
  @IsBoolean({ each: true })
  communication?: Communication;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  promo?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  currentAvatar?: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  images?: string[];

  // sports?: Sport[];
  // medals?: Medal[];
}
