import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  buildSchema,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from '../../users/models/user.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@ObjectType()
export class Fraternity {
  @Field((type) => ID)
  @prop({ required: true })
  _id: Types.ObjectId;

  @Field({ nullable: true })
  @prop({ index: true })
  accessUrl?: string;

  @Field()
  @prop({ required: true })
  name: string;

  @Field((type) => Date, { nullable: true })
  @prop()
  foundation?: Date;

  @Field((type) => Int, { nullable: true })
  @prop()
  foundationYear?: number;

  @Field((type) => [ID], { nullable: 'items' })
  @prop({ ref: () => 'User', required: true })
  admins: Ref<User>[];

  @Field((type) => [ID], { nullable: 'items' })
  @prop({ ref: () => 'User', required: true })
  members: Ref<User>[];

  @Field((type) => [ID], { nullable: 'items' })
  @prop({ ref: () => 'User', required: true })
  supporters: Ref<User>[];

  @Field({ nullable: true })
  @prop()
  avatar?: string;
}

export const FraternitySchema = buildSchema(Fraternity);
