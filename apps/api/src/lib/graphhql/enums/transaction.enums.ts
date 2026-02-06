import { registerEnumType } from '@nestjs/graphql';

export const TransactionStatus = {
  POSTED: 'posted',
  PENDING: 'pending',
};
registerEnumType(TransactionStatus, {
  name: 'TransactionStatus',
});

export const TransactionSyncStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};
registerEnumType(TransactionSyncStatus, {
  name: 'TransactionSyncStatus',
});
