export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: import('node:crypto').UUID; output: import('node:crypto').UUID; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: Date; output: Date; }
  DateTime: { input: Date; output: Date; }
};

export type Account = {
  __typename?: 'Account';
  budgetId: Scalars['ID']['output'];
  currency: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  lastFour: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: StatusEnum;
  subtype: SubtypeEnum;
  type: TypeEnum;
};

export type Budget = {
  __typename?: 'Budget';
  id: Scalars['ID']['output'];
};

export type Category = {
  __typename?: 'Category';
  amount: Scalars['Float']['output'];
  budgetId: Scalars['ID']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  totalSpent?: Maybe<Scalars['Float']['output']>;
};

export type CreateAccountInput = {
  accessToken: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  amount: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CursorPaginationInput = {
  count: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
};

export type Institution = {
  __typename?: 'Institution';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Array<Account>;
  createBudget: Budget;
  createCategory: Category;
  deleteAccount?: Maybe<Scalars['ID']['output']>;
  deleteCategory: Scalars['ID']['output'];
  deleteTransaction: Scalars['ID']['output'];
  syncTransactions: SyncTransactions;
  updateCategory: Category;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type PageInformation = {
  __typename?: 'PageInformation';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  length: Scalars['Int']['output'];
};

export type PaginatedTransaction = {
  __typename?: 'PaginatedTransaction';
  items: Array<Transaction>;
  pageInfo?: Maybe<PageInformation>;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  accounts: Array<Account>;
  budget?: Maybe<Budget>;
  categories: Array<Category>;
  category: Category;
  transaction: Transaction;
  transactions: PaginatedTransaction;
};


export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoriesArgs = {
  monthDate: Scalars['DateTime']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  monthDate: Scalars['DateTime']['input'];
  pagination?: InputMaybe<CursorPaginationInput>;
};

export enum StatusEnum {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum SubtypeEnum {
  CertificateOfDeposit = 'CERTIFICATE_OF_DEPOSIT',
  Checking = 'CHECKING',
  CreditCard = 'CREDIT_CARD',
  MoneyMarket = 'MONEY_MARKET',
  Savings = 'SAVINGS',
  Sweep = 'SWEEP',
  Treasury = 'TREASURY'
}

export enum SyncStatusEnum {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type SyncTransactions = {
  __typename?: 'SyncTransactions';
  error?: Maybe<Scalars['String']['output']>;
  status: SyncStatusEnum;
};

export type Transaction = {
  __typename?: 'Transaction';
  accountId: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  categoryId?: Maybe<Scalars['ID']['output']>;
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: TransactionStatusEnum;
  tellerId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};

export enum TransactionStatusEnum {
  Pending = 'PENDING',
  Posted = 'POSTED'
}

export enum TypeEnum {
  Credit = 'CREDIT',
  Depository = 'DEPOSITORY'
}

export type UpdateCategoryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: import('node:crypto').UUID, currency: string, enrollmentId: string, lastFour: number, name: string, type: TypeEnum, subtype: SubtypeEnum, status: StatusEnum }> };

export type CreateAccountMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: Array<{ __typename?: 'Account', id: import('node:crypto').UUID }> };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount?: import('node:crypto').UUID | null };

export type CreateBudgetMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateBudgetMutation = { __typename?: 'Mutation', createBudget: { __typename?: 'Budget', id: import('node:crypto').UUID } };

export type GetAllCategoriesQueryVariables = Exact<{
  monthDate: Scalars['DateTime']['input'];
}>;


export type GetAllCategoriesQuery = { __typename?: 'Query', budget?: { __typename?: 'Budget', id: import('node:crypto').UUID } | null, categories: Array<{ __typename?: 'Category', id: import('node:crypto').UUID, name: string, amount: number, totalSpent?: number | null }> };

export type CategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: import('node:crypto').UUID, name: string, amount: number } };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: import('node:crypto').UUID, name: string, amount: number } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: import('node:crypto').UUID };

export type GetTransactionsWithPaginationQueryVariables = Exact<{
  monthDate: Scalars['DateTime']['input'];
  pagination?: InputMaybe<CursorPaginationInput>;
}>;


export type GetTransactionsWithPaginationQuery = { __typename?: 'Query', transactions: { __typename?: 'PaginatedTransaction', items: Array<{ __typename?: 'Transaction', id: import('node:crypto').UUID, tellerId: import('node:crypto').UUID, accountId: import('node:crypto').UUID, categoryId?: import('node:crypto').UUID | null, amount: number, date: Date, description: string, status: TransactionStatusEnum, type: string }>, pageInfo?: { __typename?: 'PageInformation', hasNextPage: boolean, endCursor?: string | null, length: number } | null } };

export type GetTransactionByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTransactionByIdQuery = { __typename?: 'Query', transaction: { __typename?: 'Transaction', id: import('node:crypto').UUID, accountId: import('node:crypto').UUID, categoryId?: import('node:crypto').UUID | null, amount: number, date: Date, description: string, status: TransactionStatusEnum, type: string } };

export type SyncTransactionsMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncTransactionsMutation = { __typename?: 'Mutation', syncTransactions: { __typename?: 'SyncTransactions', status: SyncStatusEnum, error?: string | null } };

export type DeleteTransactionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: import('node:crypto').UUID };
