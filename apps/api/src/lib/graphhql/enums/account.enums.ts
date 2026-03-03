import { registerEnumType } from '@nestjs/graphql';

export const AccountType = {
  DEPOSITIORY: 'DEPOSITORY',
  CREDIT: 'CREDIT',
};
registerEnumType(AccountType, {
  name: 'AccountType',
});

export const AccountSubtype = {
  CREDIT: 'CREDIT',
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  MONEY_MARKET: 'MONEY_MARKET',
  CERTIFICATE_OF_DEPOSIT: 'CERTIFICATE_OF_DEPOSIT',
  TREASURY: 'TREASURY',
  SWEEP: 'SWEEP',
};
registerEnumType(AccountSubtype, {
  name: 'AccountSubtype',
});

export const AccountStatus = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};
registerEnumType(AccountStatus, {
  name: 'AccountStatus',
});
