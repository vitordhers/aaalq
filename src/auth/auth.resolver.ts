import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserCredentials } from './models/user-credentials.model';
import { AuthService } from './auth.service';
import { SignInArgs } from './dto/args/sign-in.args';
import { GetDataFromRefreshToken } from './decorators/get-data-from-refresh-token.decorator';
import { GqlRefreshTokenGuard } from './guards/refresh-token.guard';

@Resolver(() => UserCredentials)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserCredentials, { name: 'signin' })
  @UsePipes(new ValidationPipe())
  async signIn(@Args() signInArgs: SignInArgs) {
    return await this.authService.signIn(signInArgs);
  }

  @Query(() => UserCredentials, { name: 'token' })
  @UseGuards(GqlRefreshTokenGuard)
  async refreshToken(
    @GetDataFromRefreshToken() data: { id: string; refreshToken: string },
  ) {
    return {
      accessToken: await this.authService.refreshToken(data.id),
      refreshToken: data.refreshToken,
    };
  }
}
