import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const GetDataFromRefreshToken = createParamDecorator(
  (_, req: ExecutionContextHost) => {
    return {
      id: req.getArgByIndex(2).req.user.id,
      refreshToken: req.getArgByIndex(2).headers['refresh-token'],
    };
  },
);
