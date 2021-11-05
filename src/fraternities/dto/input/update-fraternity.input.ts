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
  MinDate,
  MaxDate,
} from 'class-validator';
// import { Transform } from 'class-transformer';

@InputType()
export class UpdateFraternityInput {
  @Field((type) => ID)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  accessUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name?: string;

  @Field((type) => Date, { nullable: true })
  @MinDate(new Date(-1483228800))
  @MaxDate(new Date())
  foundation?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar?: string;
}
