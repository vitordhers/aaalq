import { registerEnumType } from '@nestjs/graphql';

export enum SupporterTier {
  NONPARTNER = 'NONPARTNER',
  PARTNER_1 = 'PARTNER_1',
  PARTNER_2 = 'PARTNER_2',
  PARTNER_3 = 'PARTNER_3',
}

registerEnumType(SupporterTier, {
  name: 'SupporterTier',
});
