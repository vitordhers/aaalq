import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

@ArgsType()
export class GetFraternityArgs {
  @Field((type) => ID, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  accessUrl?: string;

  @Field((type) => ID, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  memberId?: Types.ObjectId;
}
