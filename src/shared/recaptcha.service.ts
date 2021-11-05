import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class RecaptchaService {
  constructor(private readonly http: HttpService) {}

  async googleRecaptchaCheck(
    response: string,
    remoteip?: string,
  ): Promise<boolean> {
    const secret_key = process.env.GOOGLE_RECAPTCHA_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response}`;

    try {
      return await this.http
        .post(url)
        .pipe(map((r) => (r.data.score > 0.7 ? true : false)))
        .toPromise();
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
