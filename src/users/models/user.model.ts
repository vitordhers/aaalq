import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  buildSchema,
  modelOptions,
  prop,
  Ref,
  Severity,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Fraternity } from '../../fraternities/models/fraternity.model';
import { SupporterTier } from '../enums/supporter-tier.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

@modelOptions({
  schemaOptions: {
    toObject: {
      transform: function (doc, ret, options) {
        Object.setPrototypeOf(ret, Object.getPrototypeOf(new User()));
      },
    },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@ObjectType()
export class User {
  @Field((type) => ID)
  @prop({ required: true })
  _id: Types.ObjectId;

  @Field({ nullable: true })
  @prop({ index: true, unique: true })
  email?: string;

  @prop()
  password?: string;

  @prop()
  salt?: string;

  @Field((type) => UserStatus, { nullable: true })
  @prop({ required: true })
  status!: UserStatus;

  @Field((type) => UserRole, { nullable: true })
  @prop({ required: true })
  role!: UserRole;

  @Field((type) => SupporterTier, { nullable: true })
  @prop({ required: true })
  supporter!: SupporterTier;

  @Field({ nullable: false })
  @prop({ required: true })
  name!: string;

  @Field({ nullable: true })
  @prop()
  nickname?: string;

  @Field({ nullable: true })
  @prop()
  currentAvatar?: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @prop()
  avatars?: string[];

  @Field((type) => Int, { nullable: true })
  @prop()
  freshmanYear?: number;

  @Field((type) => ID, { nullable: true })
  @prop({ ref: () => Fraternity })
  fraternityId?: Ref<Fraternity>;

  @Field((type) => Fraternity, { nullable: true })
  fraternity?: Fraternity;

  // sports?: any[];

  // medals?: any[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  @prop()
  images?: string[];

  // @Field((type) => [String], { nullable: 'itemsAndList' })
  // notifications,
}

export const UserSchema = buildSchema(User);
