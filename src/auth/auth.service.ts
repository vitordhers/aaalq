import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from '../users/models/user.model';
import { SignInArgs } from './dto/args/sign-in.args';
import { hash } from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt.interface';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    private tokensService: TokensService,
  ) {}

  public async signIn(signInData: SignInArgs) {
    const { email, password } = signInData;
    const user = await this.userModel
      .findOne({ email }, { email: 1, password: 1, salt: 1, role: 1 })
      .exec();

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const hashedpassword = await hash(password, user.salt);

    if (hashedpassword !== user.password) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload: JwtPayload = {
      id: user._id,
      role: user.role,
      access: 'full',
    };
    return await this.tokensService.createTokens(payload);
  }

  public async refreshToken(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user) {
      const payload: JwtPayload = {
        id: user._id,
        role: user.role,
        access: 'full',
      };

      return await this.tokensService.createAccessToken(payload);
    } else {
      throw new UnauthorizedException();
    }
  }
}
