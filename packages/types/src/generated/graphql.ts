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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date; }
};

export type Bank = {
  __typename?: 'Bank';
  balance: Scalars['Float']['output'];
  budget: Budget;
  color: Color;
  currency: Scalars['String']['output'];
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institution: Institution;
  lastFour: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: BankStatus;
  subtype: BankSubtype;
  tellerId: Scalars['String']['output'];
  type: BankType;
};

export enum BankStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export enum BankSubtype {
  CertificateOfDeposit = 'CERTIFICATE_OF_DEPOSIT',
  Checking = 'CHECKING',
  Credit = 'CREDIT',
  MoneyMarket = 'MONEY_MARKET',
  Savings = 'SAVINGS',
  Sweep = 'SWEEP',
  Treasury = 'TREASURY'
}

export enum BankType {
  Credit = 'CREDIT',
  Depositiory = 'DEPOSITIORY'
}

export type Budget = {
  __typename?: 'Budget';
  color: Color;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  amount: Scalars['Float']['output'];
  budget: Budget;
  color: Color;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  icon: Icon;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  totalSpent: Scalars['Float']['output'];
};

export enum Color {
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
  color: Color;
  isDefault: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  amount: Scalars['Float']['input'];
  budgetId: Scalars['ID']['input'];
  color: Color;
  icon: Icon;
  name: Scalars['String']['input'];
};

export type CreateSavingGoalInput = {
  budgetId: Scalars['ID']['input'];
  contributionAmount: Scalars['Float']['input'];
  prioritize: Scalars['Boolean']['input'];
  targetAmount: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export enum Icon {
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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBank: Bank;
  createBudget: Budget;
  createCategory: Category;
  createSavingGoal: SavingGoal;
  deleteBank: Bank;
  deleteBudget: Budget;
  deleteCategory: Category;
  deleteSavingGoal: SavingGoal;
  deleteTransaction: Scalars['String']['output'];
  syncTransactions: SyncTransactions;
  updateBudget: Budget;
  updateCategory: Category;
  updateSavingGoal: SavingGoal;
};


export type MutationCreateBankArgs = {
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


export type MutationDeleteBankArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteBudgetArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSavingGoalArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['String']['input'];
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

export type PaginatedTransactions = {
  __typename?: 'PaginatedTransactions';
  items: Array<Transaction>;
  pageInfo: TransactionPageInfo;
};

export type PaginationInput = {
  count: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  bank: Bank;
  banks: Array<Bank>;
  budget: Budget;
  budgets: Array<Budget>;
  categories: Array<Category>;
  category: Category;
  savingGoal: SavingGoal;
  savingGoals: Array<SavingGoal>;
  transaction: Transaction;
  transactions: PaginatedTransactions;
};


export type QueryBankArgs = {
  id: Scalars['String']['input'];
};


export type QueryBanksArgs = {
  budgetId: Scalars['String']['input'];
};


export type QueryBudgetArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoriesArgs = {
  budgetId: Scalars['String']['input'];
  monthDate: Scalars['DateTime']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QuerySavingGoalArgs = {
  id: Scalars['String']['input'];
};


export type QuerySavingGoalsArgs = {
  budgetId: Scalars['String']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['String']['input'];
};


export type QueryTransactionsArgs = {
  budgetId: Scalars['String']['input'];
  monthDate: Scalars['DateTime']['input'];
  pagination: PaginationInput;
};

export type SavingGoal = {
  __typename?: 'SavingGoal';
  budget: Budget;
  color: Color;
  contributionAmount: Scalars['Float']['output'];
  currentAmount: Scalars['Float']['output'];
  icon: Icon;
  id: Scalars['ID']['output'];
  lastContribution: Scalars['DateTime']['output'];
  prioritize: Scalars['Boolean']['output'];
  targetAmount: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type SyncTransactions = {
  __typename?: 'SyncTransactions';
  error?: Maybe<Scalars['String']['output']>;
  status: TransactionSyncStatus;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  bank: Bank;
  category: Category;
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  tellerId: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type TransactionPageInfo = {
  __typename?: 'TransactionPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  length: Scalars['Int']['output'];
};

export enum TransactionSyncStatus {
  Error = 'ERROR',
  Success = 'SUCCESS'
}

export type UpdateBudgetInput = {
  id: Scalars['ID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  color?: InputMaybe<Color>;
  icon?: InputMaybe<Icon>;
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
