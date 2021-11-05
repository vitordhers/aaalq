import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'USER',
  DM = 'DM',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
