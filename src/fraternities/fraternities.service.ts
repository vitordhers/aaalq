import { Injectable } from '@nestjs/common';
import { CreateFraternityInput } from './dto/input/create-fraternity.input';
import { UpdateFraternityInput } from './dto/input/update-fraternity.input';
import { GetFraternityArgs } from './dto/args/get-fraternity.args';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Fraternity } from './models/fraternity.model';
import { Types } from 'mongoose';
import { GetFraternitiesArgs } from './dto/args/get-fraternities.args';

@Injectable()
export class FraternitiesService {
  constructor(
    @InjectModel(Fraternity)
    private readonly fraternityModel: ReturnModelType<typeof Fraternity>,
  ) {}

  public async createFraternity(
    createFraternityData: CreateFraternityInput,
    adminId: string,
    fraterityId?: Types.ObjectId,
  ): Promise<Fraternity> {
    if (fraterityId) {
      console.log(fraterityId);
    }

    const newFraternity = new this.fraternityModel({
      _id: fraterityId ? fraterityId : Types.ObjectId(),
      name: createFraternityData.name,
      foundation: createFraternityData.foundation,
      foundationYear: createFraternityData.foundation.getFullYear(),
      admins: [adminId],
      members: [adminId],
    });

    const result: any = await newFraternity.save();

    return result;
  }

  public async addMemberToFraternity(fraternityId: string, userId: string) {
    return await this.fraternityModel.update(
      { _id: Types.ObjectId(fraternityId) },
      { $push: { members: Types.ObjectId(userId) } },
    );
  }

  public removeMemberFromFraternity(fraternityId: string, userId: string) {
    //
  }

  public addAdminToFraternity(fraternityId: string, userId: string) {
    //
  }

  public removeAdminFromFraternity(fraternityId: string, userId: string) {
    //
  }

  public addSupporterToFraternity(fraternityId: string, userId: string) {
    //
  }

  public removeSupporterFromFraternity(fraternityId: string, userId: string) {
    //
  }

  public async updateFraternity(updateFraternityData: UpdateFraternityInput) {
    const updatedFraternity = new this.fraternityModel({
      _id: Types.ObjectId(updateFraternityData._id),
      ...updateFraternityData,
    });

    const result = await updatedFraternity.save();
    return result;
  }

  public async getFraternity(getFraternityArgs: GetFraternityArgs) {
    let query;
    if (getFraternityArgs._id) {
      query = this.fraternityModel.findById(getFraternityArgs._id);
    } else if (getFraternityArgs.accessUrl) {
      query = this.fraternityModel.find({
        accessUrl: getFraternityArgs.accessUrl,
      });
    } else if (getFraternityArgs.memberId) {
      query = this.fraternityModel.find({
        members: getFraternityArgs.memberId,
      });
    }
    const result = await query.exec();
    return result[0];
  }

  public async getFraternities(getFraternitiesArgs: GetFraternitiesArgs) {
    let find;
    if (getFraternitiesArgs._ids) {
      const ids = [];
      getFraternitiesArgs._ids.forEach((_id) => {
        ids.push(Types.ObjectId(_id));
      });
      find = { _id: { $in: ids } };
    } else {
      find = {};
    }
    console.log(find);
    const result: DocumentType<Fraternity>[] = await this.fraternityModel
      .find(find)
      .exec();

    return result;
  }

  public async checkFraternityAdmins() {
    //
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
