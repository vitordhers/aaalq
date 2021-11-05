import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const OptionalCredential = createParamDecorator<null>(
  (_, req: ExecutionContextHost) => {
    console.log(req.getArgByIndex(2).headers);
    throw new UnauthorizedException();
    return {
      id: 'abc',
    };
  },
);
