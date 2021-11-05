import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user.model';
import { UserStatus } from './enums/user-status.enum';
import { UserRole } from './enums/user-role.enum';
import { SupporterTier } from './enums/supporter-tier.enum';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { FraternitiesService } from '../fraternities/fraternities.service';
import { pickBy } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly fraternitiesService: FraternitiesService,
  ) {}

  public async createUser(createdUserData: CreateUserInput) {
    const salt = await genSalt(12);
    const password = await hash(createdUserData.password, salt);

    type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
    type UserData = Overwrite<
      CreateUserInput,
      { fraternityId: Types.ObjectId }
    >;

    const userData: UserData = { ...createdUserData, fraternityId: null };

    if (createdUserData.fraternity) {
      userData.fraternityId = Types.ObjectId();
    } else if (createdUserData.fraternityId) {
      userData.fraternityId = Types.ObjectId(createdUserData.fraternityId);
    }

    const newUser = new this.userModel(
      pickBy({
        _id: Types.ObjectId(),
        status: UserStatus.REGISTERED,
        role: UserRole.USER,
        supporter: SupporterTier.NONPARTNER,
        ...userData,
        password,
        salt,
      }),
    );

    const result: any = await newUser.save();

    if (createdUserData.fraternity) {
      await this.fraternitiesService.createFraternity(
        createdUserData.fraternity,
        result._id,
        result.fraternityId,
      );
    } else if (createdUserData.fraternityId) {
      const res = await this.fraternitiesService.addMemberToFraternity(
        result.fraternityId,
        result._id,
      );
      console.log(res);
    }

    // await this.userModel.syncIndexes();
    return result;
  }

  public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const updatedUser = new this.userModel({
      _id: Types.ObjectId(updateUserData._id),
      ...updateUserData,
    });

    const result: any = await updatedUser.save();
    return result;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const result: DocumentType<User> = await this.userModel.findById(
      getUserArgs._id,
    );
    return result;
  }

  public async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    const ids = [];

    getUsersArgs._ids.forEach((_id) => {
      ids.push(Types.ObjectId(_id));
    });

    const result: DocumentType<User>[] = await this.userModel.find({
      _id: {
        $in: ids,
      },
    });

    return result;
  }

  // public deleteUser(deleteUserData: DeleteUserInput): User {
  //   const userIndex = this.users.findIndex(
  //     (user) => (user._id = deleteUserData._id),
  //   );

  //   const user = this.users[userIndex];

  //   this.users.splice(userIndex);

  //   return user;
  // }
}
