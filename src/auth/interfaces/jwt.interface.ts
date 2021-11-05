import { UserRole } from '../../users/enums/user-role.enum';
import { Types } from 'mongoose';
export interface JwtPayload {
  id: Types.ObjectId;
  role: UserRole;
  access: string;
  iat?: number;
  exp?: number;
}
