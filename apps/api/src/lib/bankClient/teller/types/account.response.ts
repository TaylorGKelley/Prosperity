export type AccountResponse = {
  currency: string;
  enrollment_id: string;
  id: string;
  institution: {
    id: string;
    name: string;
  };
  last_four: string;
  links: {
    self: string;
    details: string;
    balance: string;
    transactions: string;
  };
  name: string;
  type: 'depository' | 'credit';
  subtype:
    | 'checking'
    | 'savings'
    | 'money_market'
    | 'certificate_of_deposit'
    | 'treasury'
    | 'sweep'
    | 'credit_card';
  status: 'open' | 'closed';
};

export type AccountDetailResponse = {
  account_id: string;
  account_number: string;
  links: {
    self: string;
    account: string;
  };
  routing_numbers: {
    ach?: string;
    wire?: string;
    bacs?: string;
  };
};
