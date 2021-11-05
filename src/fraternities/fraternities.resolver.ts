import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { GqlAccessTokenGuard } from '../auth/guards/access-token.guard';
import { OptionalCredential } from '../shared/decorators/optional-credential.decorator';
import { User } from 'src/users/models/user.model';
import { GetFraternityArgs } from './dto/args/get-fraternity.args';
import { CreateFraternityInput } from './dto/input/create-fraternity.input';
// import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateFraternityInput } from './dto/input/update-fraternity.input';
import { FraternitiesService } from './fraternities.service';
import { Fraternity } from './models/fraternity.model';
import { GetFraternitiesArgs } from './dto/args/get-fraternities.args';

@Resolver(() => Fraternity)
export class FraternitiesResolver {
  constructor(private readonly fraternitiesService: FraternitiesService) {}

  @Query(() => Fraternity, { name: 'fraternity', nullable: true })
  async getFraternity(@Args() getFraternityArgs: GetFraternityArgs) {
    return await this.fraternitiesService.getFraternity(getFraternityArgs);
  }

  @Query(() => [Fraternity], { name: 'fraternities', nullable: true })
  async getFraternities(@Args() getFraternitiesArgs?: GetFraternitiesArgs) {
    return await this.fraternitiesService.getFraternities(getFraternitiesArgs);
  }

  @Mutation(() => Fraternity)
  @UseGuards(GqlAccessTokenGuard)
  @UsePipes(new ValidationPipe())
  async createFraternity(
    @Args('createFraternityData') createFraternityData: CreateFraternityInput,
    @GetUser() user,
  ) {
    const fraternity = await this.fraternitiesService.createFraternity(
      createFraternityData,
      user,
    );
    return fraternity;
  }

  @Mutation(() => Fraternity)
  async updateFraternity(
    @Args('editFraternityData') updateFraternityData: UpdateFraternityInput,
  ) {
    // return await this.fraternitiesService.updateUser(updateUserData);
  }

  @Mutation(() => Fraternity)
  async addMemberToFraternity() {
    //
  }

  @Mutation(() => User)
  async removeMemberFromFraternity() {
    //
  }

  @Mutation(() => Fraternity)
  async addAdminToFraternity() {
    //
  }

  @Mutation(() => Fraternity)
  async removeAdminFromFraternity() {
    //
  }

  // @Mutation(() => Fraternity)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.userService.deleteUser(deleteUserData);
  // }
}
