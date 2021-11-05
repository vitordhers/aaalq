import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class GetFraternitiesArgs {
  @Field((type) => [ID], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  _ids?: string[];
}
