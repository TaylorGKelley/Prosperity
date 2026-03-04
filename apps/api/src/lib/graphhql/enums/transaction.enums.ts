import { registerEnumType } from '@nestjs/graphql';

export const TransactionStatus = {
  POSTED: 'posted',
  PENDING: 'pending',
} as const;
registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
});

export const TransactionSyncStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
registerEnumType(TransactionSyncStatus, {
  name: 'TransactionSyncStatus',
});
