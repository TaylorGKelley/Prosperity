import { registerEnumType } from '@nestjs/graphql';

export const BankType = {
  DEPOSITIORY: 'DEPOSITORY',
  CREDIT: 'CREDIT',
};
registerEnumType(BankType, {
  name: 'BankType',
});

export const BankSubtype = {
  CREDIT: 'CREDIT',
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  MONEY_MARKET: 'MONEY_MARKET',
  CERTIFICATE_OF_DEPOSIT: 'CERTIFICATE_OF_DEPOSIT',
  TREASURY: 'TREASURY',
  SWEEP: 'SWEEP',
};
registerEnumType(BankSubtype, {
  name: 'BankSubtype',
});

export const BankStatus = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};
registerEnumType(BankStatus, {
  name: 'BankStatus',
});
