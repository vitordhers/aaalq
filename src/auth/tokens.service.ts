import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Algorithms } from './enums/algorithms.enum';
import { JwtPayload } from './interfaces/jwt.interface';
import { UserCredentials } from './models/user-credentials.model';

@Injectable()
export class TokensService {
  public async createTokens(payload: JwtPayload): Promise<UserCredentials> {
    const accessToken = this.createAccessToken(payload);
    const refreshToken = await sign(
      { id: payload.id },
      process.env.REFRESH_TOKEN_SECRET,
      { algorithm: Algorithms.ES512, expiresIn: '30d' },
    );

    return Promise.all([accessToken, refreshToken]).then((values) => {
      return { accessToken: values[0], refreshToken: values[1] };
    });
  }

  public async createAccessToken(payload: JwtPayload): Promise<string> {
    const { access } = payload;

    if (access === 'full') {
      return await sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: Algorithms.ES384,
        expiresIn: '10m',
      });
    } else {
      return await sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: Algorithms.ES256,
      });
    }
  }

  public async createEmailConfirmationToken(email: string, o: string) {
    return await sign({ email, o }, process.env.EMAIL_TOKEN_SECRET, {
      algorithm: Algorithms.HS256,
      expiresIn: '1d',
    });
  }
}
