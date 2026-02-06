export type BalanceResponse = {
  account_id: string;
  ledger?: string;
  available?: string;
  links: {
    self: string;
    account: string;
  };
};
