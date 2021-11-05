import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JwtPayload } from '../auth/interfaces/jwt.interface';
import { TokensService } from '../auth/tokens.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
// import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { UserCredentials } from '../auth/models/user-credentials.model';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { FraternitiesService } from '../fraternities/fraternities.service';
import { GqlAccessTokenGuard } from '../auth/guards/access-token.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly tokensService: TokensService,
    private readonly fraternitiesService: FraternitiesService,
  ) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs): Promise<User[]> {
    return await this.userService.getUsers(getUsersArgs);
  }

  @ResolveField()
  async fraternity(@Parent() user: User) {
    const { _id } = user;
    return this.fraternitiesService.getFraternity({ memberId: _id });
  }

  // @Query(() => User, { name: 'dashboard' })
  // @UseGuards(GqlAccessTokenGuard)
  // async getDashboardData(@GetUser() user) {
  //   this.userService.getUser({ _id: user });
  // }

  @Mutation(() => UserCredentials)
  @UsePipes(new ValidationPipe())
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<UserCredentials> {
    const user = await this.userService.createUser(createUserData);
    const payload: JwtPayload = {
      id: user._id,
      access: 'full',
      role: user.role,
    };
    return await this.tokensService.createTokens(payload);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('editUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(updateUserData);
  }

  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.userService.deleteUser(deleteUserData);
  // }
}

// @Resolver('User')
// export class UserResolver {
//   constructor(
//     private readonly userService: UsersService,
//     private readonly tokensService: TokensService,
//     private readonly fraternitiesService: FraternitiesService,
//   ) {}

//   @Query(() => User, { name: 'user', nullable: true })
//   async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
//     return await this.userService.getUser(getUserArgs);
//   }

//   @ResolveField()
//   async
// }
