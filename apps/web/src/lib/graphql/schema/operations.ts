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
  balance: Scalars['Float']['output'];
  budget: Budget;
  color: ColorEnum;
  currency: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  lastFour: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: AccountStatusEnum;
  subtype: AccountSubtypeEnum;
  type: AccountTypeEnum;
};

export enum AccountStatusEnum {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum AccountSubtypeEnum {
  CertificateOfDeposit = 'CERTIFICATE_OF_DEPOSIT',
  Checking = 'CHECKING',
  CreditCard = 'CREDIT_CARD',
  MoneyMarket = 'MONEY_MARKET',
  Savings = 'SAVINGS',
  Sweep = 'SWEEP',
  Treasury = 'TREASURY'
}

export enum AccountTypeEnum {
  Credit = 'CREDIT',
  Depository = 'DEPOSITORY'
}

export type BasicAccount = {
  __typename?: 'BasicAccount';
  color: ColorEnum;
  currency: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  lastFour: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: AccountStatusEnum;
  subtype: AccountSubtypeEnum;
  type: AccountTypeEnum;
};

export type BasicCategory = {
  __typename?: 'BasicCategory';
  amount: Scalars['Float']['output'];
  color: ColorEnum;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  icon: IconEnum;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type BasicSavingGoal = {
  __typename?: 'BasicSavingGoal';
  contributionAmount: Scalars['Float']['output'];
  currentAmount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lastContribution: Scalars['DateTime']['output'];
  prioritize: Scalars['Boolean']['output'];
  targetAmount: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Budget = {
  __typename?: 'Budget';
  color: ColorEnum;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  amount: Scalars['Float']['output'];
  budget: Budget;
  color: ColorEnum;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  icon: IconEnum;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  totalSpent: Scalars['Float']['output'];
};

export enum ColorEnum {
  Amber = 'AMBER',
  Blue = 'BLUE',
  Cyan = 'CYAN',
  Emerald = 'EMERALD',
  Fuschia = 'FUSCHIA',
  Green = 'GREEN',
  Indigo = 'INDIGO',
  Lime = 'LIME',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  Rose = 'ROSE',
  Sky = 'SKY',
  Slate = 'SLATE',
  Stone = 'STONE',
  Teal = 'TEAL',
  Violet = 'VIOLET',
  Yellow = 'YELLOW'
}

export type CreateAccountInput = {
  accessToken: Scalars['String']['input'];
};

export type CreateBudgetInput = {
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  amount: Scalars['Float']['input'];
  budgetId: Scalars['ID']['input'];
  color: ColorEnum;
  icon: IconEnum;
  name: Scalars['String']['input'];
};

export type CreateSavingGoalInput = {
  budgetId: Scalars['ID']['input'];
  contributionAmount: Scalars['Float']['input'];
  prioritize: Scalars['Boolean']['input'];
  targetAmount: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CursorPaginationInput = {
  count: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
};

export enum IconEnum {
  AlarmClock = 'ALARM_CLOCK',
  Album = 'ALBUM',
  Ambulance = 'AMBULANCE',
  Amphora = 'AMPHORA',
  Anchor = 'ANCHOR',
  Antenna = 'ANTENNA',
  Anvil = 'ANVIL',
  Apple = 'APPLE',
  Archive = 'ARCHIVE',
  Armchair = 'ARMCHAIR',
  Axe = 'AXE',
  Baby = 'BABY',
  Backpack = 'BACKPACK',
  Bananna = 'BANANNA',
  Bandage = 'BANDAGE',
  Banknote = 'BANKNOTE',
  Bath = 'BATH',
  Bean = 'BEAN',
  Bed = 'BED',
  Beef = 'BEEF',
  Beer = 'BEER',
  BicepsFlexed = 'BICEPS_FLEXED',
  Bike = 'BIKE',
  Binoculars = 'BINOCULARS',
  Bird = 'BIRD',
  Book = 'BOOK',
  BoomBox = 'BOOM_BOX',
  Bot = 'BOT',
  BowArrow = 'BOW_ARROW',
  Brain = 'BRAIN',
  Briefcase = 'BRIEFCASE',
  Brush = 'BRUSH',
  BrushCleaning = 'BRUSH_CLEANING',
  Bubbles = 'BUBBLES',
  Bug = 'BUG',
  Building = 'BUILDING',
  Bus = 'BUS',
  Cable = 'CABLE',
  Cake = 'CAKE',
  Calculator = 'CALCULATOR',
  Camera = 'CAMERA',
  Candy = 'CANDY',
  CandyCane = 'CANDY_CANE',
  Car = 'CAR',
  Caravan = 'CARAVAN',
  Carrot = 'CARROT',
  CarFront = 'CAR_FRONT',
  Castle = 'CASTLE',
  Cat = 'CAT',
  ChefHat = 'CHEF_HAT',
  Cherry = 'CHERRY',
  Church = 'CHURCH',
  Cigarette = 'CIGARETTE',
  CircleDashed = 'CIRCLE_DASHED',
  Citrus = 'CITRUS',
  Clapperboard = 'CLAPPERBOARD',
  Clipboard = 'CLIPBOARD',
  Clock = 'CLOCK',
  Cloud = 'CLOUD',
  Clover = 'CLOVER',
  Coffee = 'COFFEE',
  Cookie = 'COOKIE',
  Croissant = 'CROISSANT',
  Dog = 'DOG',
  DoorClosed = 'DOOR_CLOSED',
  Drama = 'DRAMA',
  Drill = 'DRILL',
  Drum = 'DRUM',
  Drumstick = 'DRUMSTICK',
  Dumbbell = 'DUMBBELL',
  Earth = 'EARTH',
  Ellipsis = 'ELLIPSIS',
  Fuel = 'FUEL',
  Gamepad = 'GAMEPAD',
  Ghost = 'GHOST',
  Gift = 'GIFT',
  GlassWater = 'GLASS_WATER',
  Guitar = 'GUITAR',
  Ham = 'HAM',
  Hamburger = 'HAMBURGER',
  Hammer = 'HAMMER',
  HatGlasses = 'HAT_GLASSES',
  Headphones = 'HEADPHONES',
  Heart = 'HEART',
  Hospital = 'HOSPITAL',
  Hotel = 'HOTEL',
  House = 'HOUSE',
  IceCreamCone = 'ICE_CREAM_CONE',
  Lamp = 'LAMP',
  Laptop = 'LAPTOP',
  Leaf = 'LEAF',
  Lightbulb = 'LIGHTBULB',
  Martini = 'MARTINI',
  Medal = 'MEDAL',
  Mountain = 'MOUNTAIN',
  Newspaper = 'NEWSPAPER',
  Package = 'PACKAGE',
  Paintbrush = 'PAINTBRUSH',
  Palette = 'PALETTE',
  PartyPopper = 'PARTY_POPPER',
  PawPrint = 'PAW_PRINT',
  Phone = 'PHONE',
  Piano = 'PIANO',
  Pickaxe = 'PICKAXE',
  PiggyBank = 'PIGGY_BANK',
  Pizza = 'PIZZA',
  Plane = 'PLANE',
  PocketKnife = 'POCKET_KNIFE',
  Popcorn = 'POPCORN',
  Popsicle = 'POPSICLE',
  Printer = 'PRINTER',
  Puzzle = 'PUZZLE',
  Rabbit = 'RABBIT',
  Rat = 'RAT',
  ReceiptText = 'RECEIPT_TEXT',
  Rocket = 'ROCKET',
  RockingChair = 'ROCKING_CHAIR',
  RollerCoaster = 'ROLLER_COASTER',
  Sailboat = 'SAILBOAT',
  Salad = 'SALAD',
  Sandwich = 'SANDWICH',
  Ship = 'SHIP',
  Shirt = 'SHIRT',
  ShoppingBag = 'SHOPPING_BAG',
  ShoppingBasket = 'SHOPPING_BASKET',
  ShoppingCart = 'SHOPPING_CART',
  Shovel = 'SHOVEL',
  ShowerHead = 'SHOWER_HEAD',
  Shrimp = 'SHRIMP',
  Shrub = 'SHRUB',
  Skull = 'SKULL',
  Snowflake = 'SNOWFLAKE',
  Sofa = 'SOFA',
  Speaker = 'SPEAKER',
  Sprout = 'SPROUT',
  Squirrel = 'SQUIRREL',
  Stethoscope = 'STETHOSCOPE',
  Store = 'STORE',
  Sun = 'SUN',
  Tag = 'TAG',
  TentTree = 'TENT_TREE',
  Theater = 'THEATER',
  Tractor = 'TRACTOR',
  TreePine = 'TREE_PINE',
  Truck = 'TRUCK',
  Turtle = 'TURTLE',
  Umbrella = 'UMBRELLA',
  Utensils = 'UTENSILS',
  Wallet = 'WALLET',
  Wheat = 'WHEAT',
  Wrench = 'WRENCH'
}

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
  createSavingGoal: SavingGoal;
  deleteAccount?: Maybe<Scalars['ID']['output']>;
  deleteBudget?: Maybe<Scalars['ID']['output']>;
  deleteCategory: Scalars['ID']['output'];
  deleteSavingGoal: Scalars['ID']['output'];
  deleteTransaction: Scalars['ID']['output'];
  syncTransactions: SyncTransactions;
  updateBudget: Budget;
  updateCategory: Category;
  updateSavingGoal: SavingGoal;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateBudgetArgs = {
  input: CreateBudgetInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateSavingGoalArgs = {
  input: CreateSavingGoalInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBudgetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSavingGoalArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBudgetArgs = {
  input: UpdateBudgetInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateSavingGoalArgs = {
  input: UpdateSavingGoalInput;
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
  budget: Budget;
  budgets: Array<Budget>;
  categories: Array<Category>;
  category: Category;
  savingGoal?: Maybe<SavingGoal>;
  savingGoals: Array<SavingGoal>;
  transaction: Transaction;
  transactions: PaginatedTransaction;
};


export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};


export type QueryAccountsArgs = {
  budgetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryBudgetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  budgetId?: InputMaybe<Scalars['ID']['input']>;
  monthDate: Scalars['DateTime']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySavingGoalArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySavingGoalsArgs = {
  budgetId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionsArgs = {
  budgetId?: InputMaybe<Scalars['ID']['input']>;
  monthDate: Scalars['DateTime']['input'];
  pagination?: InputMaybe<CursorPaginationInput>;
};

export type SavingGoal = {
  __typename?: 'SavingGoal';
  budget: Budget;
  color: ColorEnum;
  contributionAmount: Scalars['Float']['output'];
  currentAmount: Scalars['Float']['output'];
  icon: IconEnum;
  id: Scalars['ID']['output'];
  lastContribution: Scalars['DateTime']['output'];
  prioritize: Scalars['Boolean']['output'];
  targetAmount: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type SyncTransactions = {
  __typename?: 'SyncTransactions';
  error?: Maybe<Scalars['String']['output']>;
  status: TransactionSyncStatusEnum;
};

export type Transaction = {
  __typename?: 'Transaction';
  account: BasicAccount;
  amount: Scalars['Float']['output'];
  category?: Maybe<BasicCategory>;
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

export enum TransactionSyncStatusEnum {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type UpdateAccountInput = {
  color?: InputMaybe<ColorEnum>;
  id: Scalars['ID']['input'];
};

export type UpdateBudgetInput = {
  id: Scalars['ID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  color?: InputMaybe<ColorEnum>;
  icon?: InputMaybe<IconEnum>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSavingGoalInput = {
  contributionAmount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  prioritize?: InputMaybe<Scalars['Boolean']['input']>;
  targetAmount?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAccountMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: Array<{ __typename?: 'Account', id: import('node:crypto').UUID, currency: string, enrollmentId: string, lastFour: number, name: string, color: ColorEnum, type: AccountTypeEnum, subtype: AccountSubtypeEnum, status: AccountStatusEnum }> };

export type BudgetPageQueryVariables = Exact<{
  monthDate: Scalars['DateTime']['input'];
  budgetId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type BudgetPageQuery = { __typename?: 'Query', budgets: Array<{ __typename?: 'Budget', id: import('node:crypto').UUID, name: string, color: ColorEnum, isDefault: boolean }>, categories: Array<{ __typename?: 'Category', id: import('node:crypto').UUID, name: string, icon: IconEnum, color: ColorEnum, amount: number, totalSpent: number, startDate: Date, endDate?: Date | null }>, accounts: Array<{ __typename?: 'Account', id: import('node:crypto').UUID, balance: number, currency: string, enrollmentId: string, lastFour: number, name: string, color: ColorEnum, type: AccountTypeEnum, subtype: AccountSubtypeEnum, status: AccountStatusEnum, institution: { __typename?: 'Institution', id: string, name: string } }>, savingGoals: Array<{ __typename?: 'SavingGoal', id: import('node:crypto').UUID, title: string, icon: IconEnum, color: ColorEnum, targetAmount: number, currentAmount: number, contributionAmount: number, lastContribution: Date, prioritize: boolean }> };

export type GetAllBudgetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBudgetsQuery = { __typename?: 'Query', budgets: Array<{ __typename?: 'Budget', id: import('node:crypto').UUID, name: string, isDefault: boolean }> };

export type CreateCategoryMutationVariables = Exact<{
  budgetId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  icon: IconEnum;
  color: ColorEnum;
  amount: Scalars['Float']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: import('node:crypto').UUID, name: string, icon: IconEnum, color: ColorEnum, amount: number, totalSpent: number, startDate: Date, endDate?: Date | null, budget: { __typename?: 'Budget', id: import('node:crypto').UUID, name: string, color: ColorEnum, isDefault: boolean } } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: import('node:crypto').UUID };

export type TransactionPageQueryVariables = Exact<{
  monthDate: Scalars['DateTime']['input'];
  budgetId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type TransactionPageQuery = { __typename?: 'Query', transactions: { __typename?: 'PaginatedTransaction', items: Array<{ __typename?: 'Transaction', id: import('node:crypto').UUID, tellerId: import('node:crypto').UUID, amount: number, date: Date, description: string, status: TransactionStatusEnum, type: string, category?: { __typename?: 'BasicCategory', id: import('node:crypto').UUID, icon: IconEnum, color: ColorEnum } | null, account: { __typename?: 'BasicAccount', id: import('node:crypto').UUID } }>, pageInfo?: { __typename?: 'PageInformation', length: number, hasNextPage: boolean, endCursor?: string | null } | null }, accounts: Array<{ __typename?: 'Account', id: import('node:crypto').UUID, currency: string, enrollmentId: string, lastFour: number, name: string, color: ColorEnum, type: AccountTypeEnum, subtype: AccountSubtypeEnum, status: AccountStatusEnum }>, categories: Array<{ __typename?: 'Category', id: import('node:crypto').UUID, name: string, icon: IconEnum, color: ColorEnum, amount: number, totalSpent: number, endDate?: Date | null }> };

export type SyncTransactionsMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncTransactionsMutation = { __typename?: 'Mutation', syncTransactions: { __typename?: 'SyncTransactions', status: TransactionSyncStatusEnum, error?: string | null } };
