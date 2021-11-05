import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((_, req) => {
  console.log('get user decorator', req.user);
  if (req.user) {
    return req.user;
  }
});
