import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RecaptchaService } from '../recaptcha.service';

@ValidatorConstraint({ name: 'GoogleRecaptchaV3', async: true })
@Injectable()
export class GoogleRecaptchaV3Constraint
  implements ValidatorConstraintInterface {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  async validate(recaptcha: string) {
    return await this.recaptchaService.googleRecaptchaCheck(recaptcha);
  }
}

export function GoogleRecaptchaV3(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: GoogleRecaptchaV3Constraint,
    });
  };
}
