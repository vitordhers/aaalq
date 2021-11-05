import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCredentials {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
