import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsDefined,
  IsDate,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateFraternityInput {
  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field((type) => Date, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  foundation?: Date;
}
